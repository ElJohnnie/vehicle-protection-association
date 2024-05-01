import axios from 'axios'
import { CustomError } from '../../../helpers/CustomError'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'

const deletePlanPayController = async (id: string) => {
    const token = await getTokenGalaxyPay()

    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.delete(`${process.env.GALAXYPAY_HOST}/plans/${id}/myId`, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)
        return response
    } catch (error) {
        throw new CustomError('Erro ao deletar plano no galaxy pay', 500)
    }
}

export { deletePlanPayController }
