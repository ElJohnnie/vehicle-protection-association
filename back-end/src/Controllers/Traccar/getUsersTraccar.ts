import 'dotenv/config'
import { encode } from 'base-64'
import { CustomError } from '../../helpers/CustomError'
import axios from 'axios'

const getUsersTraccar = async () => {
    const header = encode(`${process.env.TRACCAR_USER}:${process.env.TRACCAR_PASSWORD}`)

    const basicAuth = {
        Authorization: `Basic ${header}`
    }

    try {
        const response = await axios.get(`${process.env.TRACCAR_HOST}/users`, { headers: basicAuth })

        let users = response.data.map(function (user) {
            return {
                id: user.id,
                name: user.name,
                login: user.login,
                clientId: user.clientID
            }
        })

        return users
    } catch (error) {
        throw new CustomError('Erro ao obter os usuários da TRACCAR', 500)
    }
}

export { getUsersTraccar }
