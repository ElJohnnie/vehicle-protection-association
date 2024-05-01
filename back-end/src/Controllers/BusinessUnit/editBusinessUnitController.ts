import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { ICreateBusinessUnit } from '../../utils/interface'
import { regexDocumentNumberReplace, regexZipCodeReplace } from '../../utils/mask'
import { getBusinessUnitByUniqueAttribute } from './utils/getBusinessUnitByUniqueAttribute'

const editBusinessUnitController = async (req: Request, res: Response) => {
    const id = req.params.id

    const businessUnit = await getBusinessUnitByUniqueAttribute('id', id)

    if (!businessUnit) {
        throw new CustomError('A unidade que deseja atualizar não existe na base de dados', 422)
    }

    const updatedBusinessUnit = await updateBusinessUnit(req)

    res.status(200).json({
        businessUnit: updatedBusinessUnit
    })
}

const updateBusinessUnit = async (req: Request) => {
    const id = req.params.id
    const {
        corporateName,
        documentNumber,
        address
    }:ICreateBusinessUnit = req.body

    try {
        const businessUnit = await prismaClient.businessUnit.update({
            where: {
                id: id
            },
            data: {
                corporateName: corporateName,
                documentNumber: regexDocumentNumberReplace(documentNumber),
                ...(
                    address && {
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
                        }
                    }
                )
            }
        })
        return businessUnit
    } catch (error) {
        throw new CustomError('Erro ao atualizar unidade', 500)
    }
}

export { editBusinessUnitController }
