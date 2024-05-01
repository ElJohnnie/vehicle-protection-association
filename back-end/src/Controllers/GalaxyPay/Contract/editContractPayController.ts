import { IEditContractPay } from '../../../utils/interface'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'
import axios from 'axios'
import { CustomError } from '../../../helpers/CustomError'

const editContractPayController = async (contract: IEditContractPay) => {
    const resInfo = await editInfoContract(contract)
    const resPayment = await editPaymentContract(contract)

    if (!resInfo.type || !resPayment.type) {
        throw new CustomError('Erro ao editar o contrato na plataforma galax pay', 500)
    }

    return resInfo
}

const editInfoContract = async (contract: IEditContractPay) => {
    const token = await getTokenGalaxyPay()

    const data = {
        myId: contract.id,
        ...(contract.planMyId && { planMyId: contract.planMyId }),
        ...(contract.additionalInfo && { additionalInfo: contract.additionalInfo })
    }

    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.put(`${process.env.GALAXYPAY_HOST}/subscriptions/${contract.id}/myId`, data, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)

        return response
    } catch (error) {
        throw new CustomError('Erro ao editar informações do contrato no galaxy pay', 500)
    }
}

const editPaymentContract = async (contract: IEditContractPay) => {
    const token = await getTokenGalaxyPay()

    const data = {
        value: Math.ceil(Number(contract.value) * 100)
    }

    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.put(`${process.env.GALAXYPAY_HOST}/subscriptions/${contract.id}/myId`, data, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)

        return response
    } catch (error) {
        throw new CustomError('Erro ao editar valor do contrato no galaxy pay', 500)
    }
}

export { editContractPayController }
