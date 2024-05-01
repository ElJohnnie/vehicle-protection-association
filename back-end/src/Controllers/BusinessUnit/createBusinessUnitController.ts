import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { ICreateBusinessUnit } from '../../utils/interface'
import { regexDocumentNumberReplace, regexZipCodeReplace } from '../../utils/mask'

const createBusinessUnitController = async (req: Request, res: Response) => {
    const businessUnit = await saveBusinessUnit(req)

    res.status(201).json({
        businessUnit
    })
}

const saveBusinessUnit = async (req: Request) => {
    const {
        corporateName,
        documentNumber,
        address
    }:ICreateBusinessUnit = req.body

    try {
        const businessUnit = await prismaClient.businessUnit.create({
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
        throw new CustomError('Erro ao cadastrar unidade', 500)
    }
}

export { createBusinessUnitController }
