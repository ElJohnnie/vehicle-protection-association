import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getBusinessUnitByUniqueAttribute } from './utils/getBusinessUnitByUniqueAttribute'

const deleteBusinessUnitController = async (req: Request, res: Response) => {
    const id = req.params.id

    const businessUnit = await getBusinessUnitByUniqueAttribute('id', id)

    if (!businessUnit) {
        throw new CustomError('A unidade que deseja excluir não existe na base de dados', 422)
    }

    await deleteBusinessUnit(id)

    res.status(200).json({
        message: 'Sucesso ao excluir o unidade'
    })
}

const deleteBusinessUnit = async (id: string) => {
    try {
        await prismaClient.businessUnit.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao deletar a unidade', 500)
    }
}

export { deleteBusinessUnitController }
