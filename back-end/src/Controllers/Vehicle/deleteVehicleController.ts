import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getVehicleByUniqueAttribute } from './utils/getVehicleByUniqueAttribute'

const deleteVehicleController = async (req: Request, res: Response) => {
    const id = req.params.id

    const vehicle = await getVehicleByUniqueAttribute('id', id)

    if (!vehicle) {
        throw new CustomError('O veículo que deseja excluir não existe na base de dados', 422)
    }

    await deleteVehicle(id)

    res.status(200).json({
        message: 'Sucesso ao excluir o veículo'
    })
}

const deleteVehicle = async (id) => {
    try {
        const vehicleDelete = await prismaClient.vehicle.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao deletar o veículo', 500)
    }
}

export { deleteVehicleController }
