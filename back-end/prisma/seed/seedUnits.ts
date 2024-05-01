import { prismaClient } from '../../src/database/prismaClient'
import { regexDocumentNumberReplace } from '../../src/utils/mask'

const seedUnits = async () => {
    await prismaClient.businessUnit.createMany({
        data: [
            {
                id: 'unit_a',
                corporateName: 'Unidade A',
                documentNumber: regexDocumentNumberReplace('345.566.777-31')
            },
            {
                id: 'unit_b',
                corporateName: 'Unidade B',
                documentNumber: regexDocumentNumberReplace('345.566.777-31')
            },
            {
                id: 'unit_c',
                corporateName: 'Unidade C',
                documentNumber: regexDocumentNumberReplace('345.566.777-31')
            }
        ]
    })
}

export { seedUnits }
