import 'dotenv/config'
import { encode } from 'base-64'
import { CustomError } from '../../helpers/CustomError'
import axios from 'axios'

const editUserTraccar = async (id: string) => {
    const header = encode(`${process.env.TRACCAR_USER}:${process.env.TRACCAR_PASSWORD}`)
    const basicAuth = {
        Authorization: `Basic ${header}`
    }

    const body = {
        disabled: true
    }

    try {
        const response = await axios.put(`${process.env.TRACCAR_HOST}/users/${id}`, body, { headers: basicAuth })
        return response
    } catch (error) {
        throw new CustomError('Erro ao obter os usuários da TRACCAR', 500)
    }
}

export { editUserTraccar }
