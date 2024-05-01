import { NextFunction, Request, Response } from 'express'
import { ICreateEvent } from '../../utils/interface'
import { CustomError } from '../../helpers/CustomError'
import { regexZipCodeValidate } from '../../utils/mask'

const validateCreateFields = async (req:Request, res:Response, next:NextFunction) => {
    const {
        description, type, occurrenceDateTime, policeReport, address, vehicleId
    }: ICreateEvent = req.body

    if (!description) {
        throw new CustomError('A descrição do evento é obrigatória', 422)
    } else if (!type) {
        throw new CustomError('O tipo de evento é obrigatório', 422)
    } else if (!occurrenceDateTime) {
        throw new CustomError('A data da ocorrência do evento é obrigatória', 422)
    } else if (typeof policeReport !== 'boolean' && !policeReport) {
        throw new CustomError('É obrigatório informar se o evento foi reportado à policia', 422)
    } else if (!vehicleId) {
        throw new CustomError('É obrigatório informar o veículo com qual ocorreu o evento', 422)
    } else if (!address) {
        throw new CustomError('É obrigatório informar o endereço onde ocorreu o evento', 422)
    } else if (address) {
        if (!address.zipCode) {
            throw new CustomError('O CEP do endereço é obrigatório', 422)
        } else if (!regexZipCodeValidate(address.zipCode)) {
            throw new CustomError('O CEP do endereço é inválido', 422)
        } else if (!address.street) {
            throw new CustomError('O logradouro é obrigatório', 422)
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

export { validateCreateFields }
