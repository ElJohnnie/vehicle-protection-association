import { NextFunction, Request, Response } from 'express'
import { ICreatePlan } from '../../utils/interface'
import { CustomError } from '../../helpers/CustomError'
import { PlanPeriodicity } from '../../utils/enum'

const validateEditFields = async (req: Request, res: Response, next: NextFunction) => {
    const { name, periodicity, quantity, additionalInfo, planPrices }:ICreatePlan = req.body

    if (!name) {
        throw new CustomError('O nome do plano é obrigatório', 422)
    } else if (!periodicity) {
        throw new CustomError('A periodicidade do plano é obrigatória', 422)
    } else if (!Object.values(PlanPeriodicity).includes(periodicity)) {
        throw new CustomError('A periodicidade do plano é inválida', 422)
    } else if (!quantity) {
        throw new CustomError('A quantidade de parcelas do plano é obrigatório', 422)
    } else if (!planPrices) {
        throw new CustomError('O meio de pagamento do plano é obrigatório', 422)
    } else if (planPrices && planPrices.length < 0) {
        throw new CustomError('Deve ser adicionado ao menos meio de pagamento no plano', 422)
    }

    next()
}

export { validateEditFields }
