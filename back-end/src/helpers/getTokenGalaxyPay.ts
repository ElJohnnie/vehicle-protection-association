import 'dotenv/config'
import { encode } from 'base-64'
import { CustomError } from './CustomError'
import axios from 'axios'

const getTokenGalaxyPay = async () => {
    const header = encode(`${process.env.GALAXYPAY_ID}:${process.env.GALAXYPAY_HASH}`)

    const data = {
        grant_type: 'authorization_code',
        scope: 'customers.read customers.write plans.read plans.write transactions.read transactions.write webhooks.write cards.read cards.write card-brands.read subscriptions.read subscriptions.write charges.read charges.write boletos.read carnes.read'
    }
    const basicAuth = {
        Authorization: `Basic ${header}`
    }

    try {
        const response = await axios.post(`${process.env.GALAXYPAY_HOST}/token`, data,
            {
                headers: basicAuth
            }
        )
        return response.data
    } catch (error) {
        throw new CustomError('Erro ao requisitar token galaxy pay', 500)
    }
}

export { getTokenGalaxyPay }
