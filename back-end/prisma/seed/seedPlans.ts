import { prismaClient } from '../../src/database/prismaClient'
import { PlanPeriodicity } from '../../src/utils/enum'
const seedPlans = async () => {
    await prismaClient.plan.create({
        data: {
            id: 'plan_gold',
            name: 'Plano Ouro',
            periodicity: PlanPeriodicity.MONTHLY,
            additionalInfo: 'loreipsumNisi laborum elit do non laboris in reprehenderit. Quis irure irure do sint. Fugiat proident eu mollit occaecat. Ullamco fugiat aute anim occaecat sunt nulla Lorem culpa aliqua. Deserunt consequat duis laborum laborum incididunt. Non cillum excepteur Lorem do elit deserunt nostrud.',
            quantity: 12,
            planPrices: {
                createMany: {
                    data: [
                        {
                            payment: 'creditcard',
                            value: 13900
                        },
                        {
                            payment: 'boleto',
                            value: 14000
                        }
                    ]
                }
            }
        }
    })
}

export { seedPlans }
