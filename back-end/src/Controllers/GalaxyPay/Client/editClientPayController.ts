import axios from 'axios'
import { Request } from 'express'
import { CustomError } from '../../../helpers/CustomError'
import { getTokenGalaxyPay } from '../../../helpers/getTokenGalaxyPay'
import { regexDocumentNumberReplace, regexMobilePhoneReplace, regexZipCodeReplace } from '../../../utils/mask'

const editClientPayController = async (req: Request) => {
    const token = await getTokenGalaxyPay()
    const id = req.params.id
    const { fullname, documentNumber, email, mobilephone, address } = req.body

    const data = {
        myId: id,
        name: fullname,
        document: regexDocumentNumberReplace(documentNumber),
        emails: [
            email
        ],
        phones: [
            parseInt(regexMobilePhoneReplace(mobilephone))
        ],
        Address: {
            zipCode: regexZipCodeReplace(address.zipCode),
            street: address.street,
            number: address.number,
            complement: address.complement,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state
        }
    }
    const bearerAuth = `${token.token_type} ${token.access_token}`

    try {
        const response = await axios.put(`${process.env.GALAXYPAY_HOST}/customers/${id}/myId`, data, {
            headers: {
                Authorization: bearerAuth,
                'Content-type': 'application/json'
            }
        }).then(res => res.data)
        return response
    } catch (error) {
        throw new CustomError('Erro ao editar cliente no galaxy pay', 500)
    }
}

export { editClientPayController }
