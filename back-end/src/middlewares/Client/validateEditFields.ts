import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../helpers/CustomError'
import { LicenseCategory } from '../../utils/enum'
import { ICreateClient } from '../../utils/interface'
import { regexDocumentNumberValidate, regexMobilePhoneValidate, regexZipCodeValidate } from '../../utils/mask'

const validateEditFields = (req: Request, res: Response, next: NextFunction) => {
    const {
        businessUnitId, documentNumber, fullname, email, telephone, mobilephone, indication, address, identityDocument, licenseDocument
    }: ICreateClient = req.body

    if (!businessUnitId) {
        throw new CustomError('A unidade de prenchimento é obrigatório', 422)
    } else if (!documentNumber) {
        throw new CustomError('O número do documento é obrigatório', 422)
    } else if (!regexDocumentNumberValidate(documentNumber)) {
        throw new CustomError('O número do documento é inválido', 422)
    } else if (!fullname) {
        throw new CustomError('O nome completo é obrigatório', 422)
    } else if (!email) {
        throw new CustomError('O email é obrigatório', 422)
    } else if (!mobilephone) {
        throw new CustomError('O número do celular é obrigatório', 422)
    } else if (!regexMobilePhoneValidate(mobilephone)) {
        throw new CustomError('O número do celular é inválido', 422)
    } else if (!address) {
        throw new CustomError('O endereço é obrigatório', 422)
    } else if (!address.zipCode) {
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
    } else if (!identityDocument) {
        throw new CustomError('O documento de identidade é obrigatório', 422)
    } else if (!identityDocument.identityNumber) {
        throw new CustomError('O número da identidade é obrigatório', 422)
    } else if (!identityDocument.expeditionOrgan) {
        throw new CustomError('O orgão de expedição é obrigatório', 422)
    } else if (!identityDocument.expeditionDate) {
        throw new CustomError('A data de expedição é obrigatória', 422)
    } else if (!identityDocument.birthDate) {
        throw new CustomError('A data de nascimento é obrigatória', 422)
    } else if (!identityDocument.UF) {
        throw new CustomError('O UF é obrigatório', 422)
    } else if (!licenseDocument) {
        throw new CustomError('A carteira de motorista é obrigatória', 422)
    } else if (!licenseDocument.licenseNumber) {
        throw new CustomError('O número da carteira de motorista é obrigatório', 422)
    } else if (!licenseDocument.licenseCategory) {
        throw new CustomError('A categoria da carteira de motorista é obrigatório', 422)
    } else if (!Object.values(LicenseCategory).includes(licenseDocument.licenseCategory)) {
        throw new CustomError('A categoria da carteira de motorista é inválida', 422)
    }

    next()
}

export { validateEditFields }
