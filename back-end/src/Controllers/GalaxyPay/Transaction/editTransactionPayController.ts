import axios from 'axios'
import { CustomError } from '../../../helpers/CustomError'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'
import { format, parse } from 'date-fns'

const editTransactionPayController = async (req) => {
    const id = req.params.id
    const { value, payday, payedOutsideGalaxPay, additionalInfo } = req.body

    const token = await getTokenGalaxyPay()

    const bearerAuth = `${token.token_type} ${token.access_token}`

    const data = {
        myId: id,
        ...(value && { value: Math.ceil(Number(value) * 100) }),
        ...(payedOutsideGalaxPay && { payedOutsideGalaxPay: payedOutsideGalaxPay }),
        ...(additionalInfo && { additionalInfo: additionalInfo })
    }

    try {
        const response = await axios.put(`${process.env.GALAXYPAY_HOST}/transactions/${id}/galaxPayId`, data, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)

        return response
    } catch (error) {
        throw new CustomError('Erro ao editar transação no galaxy pay', 500)
    }
}

export { editTransactionPayController }
