import axios from 'axios'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'
import { CustomError } from '../../../helpers/CustomError'
import { IPlanPrice } from '../../../utils/interface'

const createPlanPayController = async (plan) => {
    const token = await getTokenGalaxyPay()
    const data = {
        myId: plan.id,
        name: plan.name,
        periodicity: plan.periodicity,
        quantity: plan.quantity,
        additionalInfo: plan.additionalInfo,
        PlanPrices:
            Array.from(plan.planPrices).map((item:IPlanPrice) => {
                return {
                    payment: item.payment,
                    value: item.value
                }
            })
    }

    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.post(`${process.env.GALAXYPAY_HOST}/plans`, data, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)
        return response
    } catch (error) {
        throw new CustomError('Erro ao cadastrar plano no galaxy pay', 500)
    }
}

export { createPlanPayController }
