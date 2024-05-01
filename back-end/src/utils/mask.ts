import { TypeVehicle } from './enum'

const regexMobilePhoneValidate = (phone: string) => {
    const phoneRegex = /^[(][0-9]{2}[)]\s[0-9]{5}[-]{1}[0-9]{4}$/

    return phone.match(phoneRegex)
}

const regexMobilePhoneReplace = (phone: string) => {
    const replaceRegex = /\(|\)|\s|-/g

    return phone.replace(replaceRegex, '')
}

const regexZipCodeValidate = (zipCode: string) => {
    const zipCodeRegex = /^[0-9]{5}[-]{1}[0-9]{3}$/

    return zipCode.match(zipCodeRegex)
}

const regexZipCodeReplace = (zipCode: string) => {
    const replaceRegex = /-/g

    return zipCode.replace(replaceRegex, '')
}

const regexDocumentNumberValidate = (documentNumber: string) => {
    const cpfRegex = /^[0-9]{3}[.]{1}[0-9]{3}.[0-9]{3}[-]{1}[0-9]{2}$/
    const cnpjRegex = /^[0-9]{2}[.]{1}[0-9]{3}[.]{1}[0-9]{3}[/]{1}[0-9]{4}[-]{1}[0-9]{2}$/

    return documentNumber.match(cpfRegex) || documentNumber.match(cnpjRegex)
}

const regexDocumentNumberReplace = (documentNumber: string) => {
    const replaceRegex = /\.|\/|-/g

    return documentNumber.replace(replaceRegex, '')
}

const regexValueMoneyNumberReplace = (value: string) => {
    const replaceRegex = /[a-zA-z]|\$|\./g

    return Number(value.replace(replaceRegex, '').replace(',', '.'))
}

const parseTypeVehicle:any = (typeVehicle: string) => {
    switch (typeVehicle) {
    case 'cars':
        return 'CAR'
    case 'motorcycles':
        return 'MOTORCYCLE'
    case 'trucks':
        return 'TRUCK'
    default:
        return 'OTHER'
    }
}

const parseResTypeVehicle:any = (typeVehicle: TypeVehicle) => {
    switch (typeVehicle) {
    case TypeVehicle.CAR:
        return 'cars'
    case TypeVehicle.MOTORCYCLE:
        return 'motorcycles'
    case TypeVehicle.TRUCK:
        return 'trucks'
    default:
        return 'Outros'
    }
}

export {
    regexMobilePhoneValidate,
    regexMobilePhoneReplace,
    regexZipCodeValidate,
    regexZipCodeReplace,
    regexDocumentNumberValidate,
    regexDocumentNumberReplace,
    regexValueMoneyNumberReplace,
    parseTypeVehicle,
    parseResTypeVehicle
}
