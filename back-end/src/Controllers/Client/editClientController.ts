import { parse } from 'date-fns'
import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { ICreateClient, ICreateClientGalaxyPay } from '../../utils/interface'
import { regexDocumentNumberReplace, regexMobilePhoneReplace, regexZipCodeReplace } from '../../utils/mask'
import { editClientPayController } from '../GalaxyPay/Client/editClientPayController'
import { getClientByUniqueAttribute } from './utils/getClientByUniqueAttribute'

const editClientController = async (req: Request, res: Response) => {
    const id = req.params.id
    const { email, documentNumber, identityDocument, licenseDocument }: ICreateClient = req.body

    const client = await getClientByUniqueAttribute('id', id)

    if (!client) {
        throw new CustomError('O cliente que deseja atualizar não existe na base de dados', 422)
    }

    if (email !== client.email) {
        const emailExists = await getClientByUniqueAttribute('email', email)
        if (emailExists) {
            throw new CustomError('O e-mail informado já  encontra-se cadastrado no sistema', 422)
        }
    }

    if (regexDocumentNumberReplace(documentNumber) !== client.documentNumber) {
        const documentNumberExists = await getClientByUniqueAttribute('documentNumber', regexDocumentNumberReplace(documentNumber))
        if (documentNumberExists) {
            throw new CustomError('O número do documento informado já encontra-se cadastrado no sistema', 422)
        }
    }

    if (identityDocument.identityNumber !== client.identityDocument.identityNumber) {
        const identityDocumentNumberExists = await findIdentityDocumentNumber(identityDocument.identityNumber)
        if (identityDocumentNumberExists) {
            throw new CustomError('O número de identidade informado já encontra-se cadastrado no sistema', 422)
        }
    }

    if (licenseDocument.licenseNumber !== client.licenseDocument.licenseNumber) {
        const licenseDocumentInUse = await licenseDocumentIsInUse(licenseDocument.licenseNumber)
        if (licenseDocumentInUse) {
            throw new CustomError('O número da carteira de motorista informado já encontra-se em uso', 422)
        }
    }

    await updateClientGalaxyPay(req)
    const clientUpdate = await updateClient(req, res)

    res.status(200).json({
        client: clientUpdate
    })
}

const findIdentityDocumentNumber = async (identityDocumentNumber: string) => {
    try {
        const identityDocument = await prismaClient.identityDocument.findUnique({
            where: {
                identityNumber: identityDocumentNumber
            }
        })
        return identityDocument
    } catch (error) {
        throw new CustomError('Erro ao buscar documento de identidade do cliente', 500)
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

const updateClient = async (req: Request, res: Response) => {
    const {
        documentNumber, fullname, email, telephone, mobilephone, indication, address, identityDocument, licenseDocument
    }: ICreateClient = req.body

    const id = req.params.id

    const client = await getClientByUniqueAttribute('id', id)

    const isDifferentLicenseNumber = licenseDocument.licenseNumber !== client.licenseDocument.licenseNumber

    try {
        await prismaClient.client.update({
            where: {
                id: id
            },
            data: {
                documentNumber: regexDocumentNumberReplace(documentNumber),
                fullname: fullname,
                email: email,
                telephone: telephone,
                mobilephone: regexMobilePhoneReplace(mobilephone),
                indication: indication,
                address: {
                    update: {
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
                    update: {
                        identityNumber: identityDocument.identityNumber,
                        expeditionOrgan: identityDocument.expeditionOrgan,
                        expeditionDate: parse(identityDocument.expeditionDate, 'dd/MM/yyyy', Date.now()),
                        birthDate: parse(identityDocument.birthDate, 'dd/MM/yyyy', Date.now()),
                        UF: identityDocument.UF
                    }
                },
                licenseDocument: {
                    ...(isDifferentLicenseNumber
                        ? {
                            connectOrCreate: {
                                where: {
                                    licenseNumber: licenseDocument.licenseNumber
                                },
                                create: {
                                    licenseNumber: licenseDocument.licenseNumber,
                                    licenseCategory: licenseDocument.licenseCategory
                                }
                            }
                        }
                        : { }
                    )
                }
            }
        })
        const clientUpdated = await prismaClient.client.update({
            where: {
                id: id
            },
            data: {
                licenseDocument: {
                    update: {
                        licenseCategory: licenseDocument.licenseCategory
                    }
                }
            }
        })
        return clientUpdated
    } catch (error) {
        throw new CustomError('Erro ao editar o cliente', 500)
    }
}

const updateClientGalaxyPay = async (req: Request) => {
    try {
        const response = await editClientPayController(
            req
        )

        if (!response.type) {
            throw new CustomError('Erro ao editar o cliente na plataforma galaxy pay', 500)
        }

        return response
    } catch (error) {
        throw new CustomError('Erro ao editar o cliente na plataforma galaxy pay', 500)
    }
}

export { editClientController }
