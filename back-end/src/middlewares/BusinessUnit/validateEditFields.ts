import { NextFunction, Request, Response } from 'express'
import { IEditBusinessUnit } from '../../utils/interface'
import { CustomError } from '../../helpers/CustomError'
import { regexZipCodeValidate } from '../../utils/mask'

const validateEditFields = async (req: Request, res: Response, next: NextFunction) => {
    const { documentNumber, corporateName, address }:IEditBusinessUnit = req.body

    if (!documentNumber) {
        throw new CustomError('O número do documento da unidade é obrigatório', 422)
    } else if (!corporateName) {
        throw new CustomError('O nome da unidade é obrigatório', 422)
    } else if (address) {
        if (!address.zipCode) {
            throw new CustomError('O CEP do endereço é obrigatório', 422)
        } else if (!regexZipCodeValidate(address.zipCode)) {
            throw new CustomError('O CEP do endereço é inválido', 422)
        } else if (!address.street) {
            throw new CustomError('O logradouro é obrigatório', 422)
        } else if (!address.number) {
            throw new CustomError('O número do endereço é obrigatório', 422)
        } else if (!address.neighborhood) {
            throw new CustomError('O bairro é obrigatório', 422)
        } else if (!address.city) {
            throw new CustomError('O município é obrigatório', 422)
        } else if (!address.state) {
            throw new CustomError('O estado é obrigatório', 422)
        }
    }

    next()
}

export { validateEditFields }
