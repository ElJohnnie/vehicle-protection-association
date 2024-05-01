import { parse } from 'date-fns'
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { ICreateClient, ICreateClientGalaxyPay } from '../../utils/interface'
import { regexDocumentNumberReplace, regexMobilePhoneReplace, regexZipCodeReplace } from '../../utils/mask'
import { createClientPayController } from '../GalaxyPay/Client/createClientPayController'
import { getBusinessUnitByUniqueAttribute } from '../BusinessUnit/utils/getBusinessUnitByUniqueAttribute'
import { getClientByUniqueAttribute } from './utils/getClientByUniqueAttribute'

const createClientController = async (req: Request, res: Response) => {
    const { documentNumber, identityDocument, licenseDocument, email, businessUnitId }: ICreateClient = req.body

    const documentNumberExists = await getClientByUniqueAttribute('documentNumber', regexDocumentNumberReplace(documentNumber))

    if (documentNumberExists) {
        throw new CustomError('O número do documento informado já encontra-se cadastrado no sistema', 422)
    }

    const emailExists = await getClientByUniqueAttribute('email', email)

    if (emailExists) {
        throw new CustomError('O e-mail informado já encontra-se cadastrado no sistema', 422)
    }

    const identityDocumentExists = await findIdentityDocumentNumber(identityDocument.identityNumber)

    if (identityDocumentExists) {
        throw new CustomError('O número da identidade informada já encontra-se cadastrada no sistema', 422)
    }

    const licenseDocumentInUse = await licenseDocumentIsInUse(licenseDocument.licenseNumber)

    if (licenseDocumentInUse) {
        throw new CustomError('O número da carteira de motorista informado já encontra-se em uso', 422)
    }

    const businessUnitExists = await getBusinessUnitByUniqueAttribute('id', businessUnitId)

    if (!businessUnitExists) {
        throw new CustomError('A unidade que deseja alocar o cliente não existe', 422)
    }

    const client = await saveClient(req)

    res.status(201).json({
        client
    })
}

const findIdentityDocumentNumber = async (identityNumber: string) => {
    try {
        const client = await prismaClient.identityDocument.findUnique({
            where: {
                identityNumber: identityNumber
            }
        })
        return client
    } catch (error) {
        throw new CustomError('Erro ao buscar o documento de identidade do cliente', 500)
    }
}

const licenseDocumentIsInUse = async (licenseDocumentNumber:string) => {
    try {
        const client = await prismaClient.client.findFirst({
            where: {
                licenseDocument: {
                    licenseNumber: licenseDocumentNumber
                }
            }
        })
        return client
    } catch (error) {
        throw new CustomError('Erro ao buscar carteira de motorista do cliente', 500)
    }
}

const saveClient = async (req: Request) => {
    const {
        documentNumber,
        fullname,
        email,
        telephone,
        mobilephone,
        indication,
        address,
        identityDocument,
        licenseDocument,
        businessUnitId
    }: ICreateClient = req.body

    let clientId

    try {
        const client = await prismaClient.client.create({
            data: {
                documentNumber: regexDocumentNumberReplace(documentNumber),
                fullname: fullname,
                email: email,
                telephone: telephone,
                mobilephone: regexMobilePhoneReplace(mobilephone),
                indication: indication,
                address: {
                    create: {
                        zipCode: regexZipCodeReplace(address.zipCode),
                        street: address.street,
                        number: address.number,
                        complement: address.complement,
                        neighborhood: address.neighborhood,
                        city: address.city,
                        state: address.state
                    }
                },
                identityDocument: {
                    create: {
                        identityNumber: identityDocument.identityNumber,
                        expeditionOrgan: identityDocument.expeditionOrgan,
                        expeditionDate: parse(identityDocument.expeditionDate, 'dd/MM/yyyy', Date.now()),
                        birthDate: parse(identityDocument.birthDate, 'dd/MM/yyyy', Date.now()),
                        UF: identityDocument.UF
                    }
                },
                licenseDocument: {
                    connectOrCreate: {
                        where: {
                            licenseNumber: licenseDocument.licenseNumber
                        },
                        create: {
                            licenseNumber: licenseDocument.licenseNumber,
                            licenseCategory: licenseDocument.licenseCategory
                        }
                    }
                },
                unit: {
                    connect: {
                        id: businessUnitId
                    }
                }
            },
            include: {
                address: true,
                identityDocument: true,
                licenseDocument: true
            }
        })

        clientId = client.id

        if (process.env.NODE_ENV !== 'development') {
            const response = await saveClientGalaxyPay(client)

            const updateClient = await prismaClient.client.update({
                where: {
                    id: client.id
                },
                data: {
                    galaxPayId: response.Customer.galaxPayId
                }
            })

            return updateClient
        } return clientId
    } catch (error) {
        await prismaClient.client.delete({
            where: {
                id: clientId
            }
        })

        throw new CustomError('Erro ao cadastrar o cliente', 500)
    }
}

const saveClientGalaxyPay = async (client: ICreateClientGalaxyPay) => {
    try {
        const response = await createClientPayController(
            client
        )

        if (!response.type) {
            throw new CustomError('Erro ao cadastrar o cliente na plataforma galaxy pay', 500)
        }
        return response
    } catch (error) {
        throw new CustomError('Erro ao cadastrar o cliente na plataforma galaxy pay', 500)
    }
}

export { createClientController }
