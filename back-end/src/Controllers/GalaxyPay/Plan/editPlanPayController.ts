import axios from 'axios'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'
import { CustomError } from '../../../helpers/CustomError'
import { IPlanPrice } from '../../../utils/interface'

const editPlanPayController = async (req) => {
    const token = await getTokenGalaxyPay()
    const id = req.params.id
    const { name, periodicity, quantity, additionalInfo, planPrices } = req.body

    const data = {
        myId: id,
        name: name,
        periodicity: periodicity,
        quantity: quantity,
        additionalInfo: additionalInfo,
        PlanPrices:
            Array.from(planPrices).map((item:IPlanPrice) => {
                return {
                    payment: item.payment,
                    value: item.value
                }
            })
    }

    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.put(`${process.env.GALAXYPAY_HOST}/plans/${id}/myId`, data, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)
        return response
    } catch (error) {
        throw new CustomError('Erro ao editar plano no galaxy pay', 500)
    }
}

export { editPlanPayController }
