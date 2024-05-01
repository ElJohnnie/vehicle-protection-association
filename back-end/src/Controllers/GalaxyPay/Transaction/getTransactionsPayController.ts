import axios from 'axios'
import { CustomError } from '../../../helpers/CustomError'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'

const getTransactionsPayController = async (contract, startAt, limit, status) => {
    const token = await getTokenGalaxyPay()

    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.get(`${process.env.GALAXYPAY_HOST}/transactions`, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            },
            params: {
                startAt: startAt ?? 0,
                limit: limit ?? 100,
                order: 'createdAt.desc',
                status: status ?? 'pendingBoleto',
                ...(contract && { subscriptionGalaxPayIds: contract.id })
            }
        }).then(res => res.data)
        return response
    } catch (error) {
        throw new CustomError('Erro ao buscar transações no galaxy pay', 500)
    }
}

export { getTransactionsPayController }
