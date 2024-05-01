import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getContractsPayController } from '../GalaxyPay/Contract/getContractsPayController'

const getContractByVehicleUniqueKey = async (req:Request, res:Response) => {
    const id = req.params.id
    const { startAt, limit, status } = req.query

    const contractVehicle = await prismaClient.vehicle.findFirst({
        where: {
            OR: [
                {
                    licensePlate: {
                        equals: id
                    }
                },
                {
                    chassi: {
                        equals: id
                    }
                },
                {
                    renavam: {
                        equals: id
                    }
                },
                {
                    client: {
                        documentNumber: {
                            equals: id
                        }
                    }
                }
            ]
        },
        select: {
            contract: {
                select: {
                    id: true
                }
            }
        }
    })

    if (!contractVehicle) {
        throw new CustomError('Não existe contrato cadastrado para este valor', 422)
    }

    const contract = await getContractPay(contractVehicle.contract, startAt, limit, status)

    res.status(200).json(
        contract
    )
}

const getContractPay = async (contract, startAt, limit, status) => {
    const res = await getContractsPayController(contract, startAt, limit, status)

    if (!res) {
        throw new CustomError('Erro ao buscar contrato na plataforma do galax pay', 500)
    }

    return res
}

export { getContractByVehicleUniqueKey }
