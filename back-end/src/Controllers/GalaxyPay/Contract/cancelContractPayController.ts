import { Request, Response } from 'express'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'
import { CustomError } from '../../../helpers/CustomError'
import axios from 'axios'

const cancelContractPayController = async (req:Request) => {
    const id = req.params.id
    const token = await getTokenGalaxyPay()

    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.delete(`${process.env.GALAXYPAY_HOST}/subscriptions/${id}/myId`, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)

        return response
    } catch (error) {
        throw new CustomError('Erro ao cancelar contrato no galaxy pay', 500)
    }
}

export { cancelContractPayController }
