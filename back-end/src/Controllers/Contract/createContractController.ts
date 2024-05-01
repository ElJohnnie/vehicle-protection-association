import { Request, Response } from 'express'
import { ICreateContract, ICreateContractPay } from '../../utils/interface'
import { getPlanByUniqueAttribute } from '../Plan/utils/getPlanByUniqueAttribute'
import { CustomError } from '../../helpers/CustomError'
import { getVehicleByUniqueAttribute } from '../Vehicle/utils/getVehicleByUniqueAttribute'
import { prismaClient } from '../../database/prismaClient'
import { createContractPayController } from '../GalaxyPay/Contract/createContractPayController'

const createContractController = async (req: Request, res: Response) => {
    const { planMyId, vehicleId }:ICreateContract = req.body

    if (planMyId && planMyId !== undefined) {
        const planExists = await getPlanByUniqueAttribute('id', planMyId)

        if (!planExists) {
            throw new CustomError('O plano informado não está cadastrado no sistema', 422)
        }
    }

    const vehicleExists = await getVehicleByUniqueAttribute('id', vehicleId)

    if (!vehicleExists) {
        throw new CustomError('O veículo informado não está cadastrado no sistema', 422)
    }

    if (vehicleExists.contract) {
        throw new CustomError('O veículo informado já possui um contrato cadastrado no sistema', 422)
    }

    const contract = await saveContract(req)

    res.status(201).json(
        contract
    )
}

const saveContract = async (req: Request) => {
    const { planMyId, vehicleId, firstPayDayDate, additionalInfo, value, periodicity, quantity }:ICreateContract = req.body

    let id

    try {
        let contract = await prismaClient.contract.create({
            data: {
                vehicle: {
                    connect: {
                        id: vehicleId
                    }
                },
                ...(
                    planMyId !== undefined && {
                        plan: {
                            connect: {
                                id: planMyId
                            }
                        }
                    }
                )
            },
            include: {
                vehicle: {
                    include: {
                        client: true
                    }
                }
            }
        })

        const contractPay: ICreateContractPay = {
            id: contract.id,
            planMyId: contract.planId,
            firstPayDayDate: firstPayDayDate,
            ...(additionalInfo && { additionalInfo: additionalInfo }),
            clientId: contract.vehicle.client.id,
            value: value,
            periodicity: periodicity,
            quantity: quantity
        }

        id = contract.id

        await saveContractGalaxPay(contractPay)

        return contract
    } catch (error) {
        if (id !== undefined) {
            await prismaClient.contract.delete({
                where: {
                    id: id
                }
            })
        }
        throw new CustomError('Erro ao cadastrar o contrato', 500)
    }
}

const saveContractGalaxPay = async (contract: ICreateContractPay) => {
    try {
        const response = await createContractPayController(contract)

        if (!response.type) {
            throw new CustomError('Erro ao cadastrar o contrato na plataforma galax pay', 500)
        }

        return response
    } catch (error) {
        throw new CustomError('Erro ao cadastrar o contrato na plataforma galax pay', 500)
    }
}

export { createContractController }
