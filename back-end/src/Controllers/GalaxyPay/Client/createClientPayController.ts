import { Request, Response } from 'express'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'
import axios from 'axios'
import { ICreateClientGalaxyPay, ITokenGalaxyPayResponse } from '../../../utils/interface'
import { CustomError } from '../../../helpers/CustomError'

const createClientPayController = async (user: ICreateClientGalaxyPay) => {
    const token = await getTokenGalaxyPay()

    const data = {
        myId: user.id,
        name: user.fullname,
        document: user.documentNumber,
        emails: [
            user.email
        ],
        phones: [
            parseInt(user.mobilephone)
        ],
        Address: {
            zipCode: user.address.zipCode,
            street: user.address.street,
            number: user.address.number,
            complement: user.address.complement,
            neighborhood: user.address.neighborhood,
            city: user.address.city,
            state: user.address.state
        }
    }

    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.post(`${process.env.GALAXYPAY_HOST}/customers`, data, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)
        return response
    } catch (error) {
        throw new CustomError('Erro ao cadastrar cliente no galaxy pay', 500)
    }
}

export { createClientPayController }
