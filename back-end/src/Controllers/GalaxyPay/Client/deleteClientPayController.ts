import axios from 'axios'
import { CustomError } from '../../../helpers/CustomError'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'

const deleteClientPayController = async (id: string) => {
    const token = await getTokenGalaxyPay()

    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.delete(`${process.env.GALAXYPAY_HOST}/customers/${id}/myId`, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)
        return response
    } catch (error) {
        console.log('error', error.response)
        throw new CustomError('Erro ao deletar cliente no galaxy pay', 500)
    }
}

export { deleteClientPayController }
