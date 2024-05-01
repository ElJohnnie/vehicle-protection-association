import axios from 'axios'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'
import { CustomError } from '../../../helpers/CustomError'

const getCarneContractPayController = async (contractId) => {
    const token = await getTokenGalaxyPay()

    const data = {
        myIds: [
            contractId
        ]
    }

    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.post(`${process.env.GALAXYPAY_HOST}/carnes/onePDFBySubscription/customer`, data, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)
        return response
    } catch (error) {
        throw new CustomError('Erro ao gerar carnê contrato no galaxy pay', 500)
    }
}

export { getCarneContractPayController }
