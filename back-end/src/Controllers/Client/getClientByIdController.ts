import { Request, Response } from 'express'
import { getClientByUniqueAttribute } from './utils/getClientByUniqueAttribute'
import { getToken } from '../../helpers/getToken'
import { getUserByToken } from '../../helpers/getUserByToken'
import { CustomError } from '../../helpers/CustomError'
import { Role } from '../../utils/enum'
import { formatDates } from '../../helpers/formatDates'

const getClientByIdController = async (req: Request, res: Response) => {
    const id = req.params.id

    const client = await getClientByUniqueAttribute('id', id)

    await verifyAccessBusinessUnit(req, client)

    client.identityDocument.birthDate = formatDates(client.identityDocument.birthDate) as any
    client.identityDocument.expeditionDate = formatDates(client.identityDocument.expeditionDate) as any

    res.status(200).json({
        client
    })
}

const verifyAccessBusinessUnit = async (req, client) => {
    const token = getToken(req)
    const userToken = await getUserByToken(token)
    if (userToken.role !== Role.HIGH) {
        if (
            !userToken.units.find(item => item.businessUnitId === client.businessUnitId) &&
        !userToken.managerUnits.find(item => item.businessUnitId === client.businessUnitId)
        ) {
            throw new CustomError('Acesso negado, sem permissão para utilizar este recurso', 401)
        }
    }
}

export { getClientByIdController }
