import { parse } from 'date-fns'
import { prismaClient } from '../../src/database/prismaClient'
import { regexDocumentNumberReplace, regexMobilePhoneReplace, regexZipCodeReplace } from '../../src/utils/mask'

const seedClients = async () => {
    await prismaClient.client.create({
        data: {
            id: 'client_a',
            documentNumber: regexDocumentNumberReplace('466.683.540-76'),
            fullname: 'Jonatha Follmer',
            email: 'jonathafollmer@gmail.com',
            telephone: '99999999',
            mobilephone: regexMobilePhoneReplace('(55) 99929-9766'),
            indication: '',
            address: {
                create: {
                    zipCode: regexZipCodeReplace('97150-000'),
                    street: '1231313',
                    number: '1231313',
                    complement: '1231313',
                    neighborhood: 'centro',
                    city: 'Porto Alegre',
                    state: 'RS'
                }
            },
            identityDocument: {
                create: {
                    identityNumber: '1231313123',
                    expeditionOrgan: 'SSP',
                    expeditionDate: parse('12/10/2021', 'dd/MM/yyyy', Date.now()),
                    birthDate: parse('12/08/2001', 'dd/MM/yyyy', Date.now()),
                    UF: 'RS'
                }
            },
            licenseDocument: {
                create: {
                    licenseNumber: '222222',
                    licenseCategory: 'AB'
                }
            },
            unit: {
                create: {
                    id: 'unit_d',
                    corporateName: 'Unidade D',
                    documentNumber: regexDocumentNumberReplace('345.566.777-31')
                }
            }
        }
    })
}

export { seedClients }
