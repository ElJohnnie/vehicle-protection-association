import { format, parse } from 'date-fns'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'
import { ICreateContractPay } from '../../../utils/interface'
import axios from 'axios'
import { CustomError } from '../../../helpers/CustomError'

const createContractPayController = async (contract: ICreateContractPay) => {
    const token = await getTokenGalaxyPay()

    const data = contract.planMyId
        ? {
            myId: contract.id,
            planMyId: contract.planMyId,
            firstPayDayDate: format(parse(contract.firstPayDayDate, 'dd/MM/yyyy', Date.now()), 'yyyy-MM-dd'),
            ...(contract.additionalInfo && { additionalInfo: contract.additionalInfo }),
            mainPaymentMethodId: 'boleto',
            Customer: {
                myId: contract.clientId
            }
        }
        : {
            myId: contract.id,
            value: Math.ceil(Number(contract.value) * 100),
            quantity: contract.quantity,
            periodicity: contract.periodicity,
            firstPayDayDate: format(parse(contract.firstPayDayDate, 'dd/MM/yyyy', Date.now()), 'yyyy-MM-dd'),
            ...(contract.additionalInfo && { additionalInfo: contract.additionalInfo }),
            mainPaymentMethodId: 'boleto',
            Customer: {
                myId: contract.clientId
            }
        }

    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.post(`${process.env.GALAXYPAY_HOST}/subscriptions`, data, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)
        return response
    } catch (error) {
        throw new CustomError('Erro ao cadastrar contrato no galaxy pay', 500)
    }
}

export { createContractPayController }
