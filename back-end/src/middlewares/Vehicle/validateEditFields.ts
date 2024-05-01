import { Request, Response, NextFunction } from 'express'
import { ICreateVehicle, IEditVehicle } from '../../utils/interface'
import { CustomError } from '../../helpers/CustomError'
import { Fuel, LicenseCategory } from '../../utils/enum'

const validateEditFields = (req: Request, res: Response, next: NextFunction) => {
    const {
        type,
        brand,
        model,
        yearManufacture,
        yearModel,
        chassi,
        renavam,
        fuel,
        value,
        odometer,
        licensePlate,
        alieneted,
        bank,
        financedAmount,
        secondDriver,
        clientId,
        isSecondDriver
    }: IEditVehicle = req.body

    if (!type) {
        throw new CustomError('O tipo do veículo é obrigatório', 422)
    } else if (!brand) {
        throw new CustomError('A marca do veículo é obrigatório', 422)
    } else if (!model) {
        throw new CustomError('O modelo do veículo é obrigatório', 422)
    } else if (!yearManufacture) {
        throw new CustomError('O ano de fabricação do veículo é obrigatório', 422)
    } else if (!yearModel) {
        throw new CustomError('O ano do modelo do veículo é obrigatório', 422)
    } else if (!chassi) {
        throw new CustomError('O número do chassi do veículo é obrigatório', 422)
    } else if (!renavam) {
        throw new CustomError('O número do renavam do veículo é obrigatório', 422)
    } else if (!fuel) {
        throw new CustomError('O tipo de combustível do veículo é obrigatório', 422)
    } else if (!Object.values(Fuel).includes(fuel)) {
        throw new CustomError('O tipo de combustível informado não existe', 422)
    } else if (!value) {
        throw new CustomError('O valor do veículo é obrigatório', 422)
    } else if (!licensePlate) {
        throw new CustomError('A placa do veículo é obrigatória', 422)
    } else if (isSecondDriver) {
        if (!secondDriver) {
            throw new CustomError('O segundo condutor do veículo deve ser preenchido', 422)
        } else if (!secondDriver.documentNumber) {
            throw new CustomError('O número do documento do segundo condutor do veículo é obrigatório', 422)
        } else if (!secondDriver.fullname) {
            throw new CustomError('O nome do segundo condutor do veículo é obrigatório', 422)
        } else if (!secondDriver.licenseDocument) {
            throw new CustomError('Os dados da carteira de motorista do segundo condutor do veículo são obrigatórios', 422)
        } else if (secondDriver.licenseDocument) {
            if (!secondDriver.licenseDocument.licenseNumber) {
                throw new CustomError('O número da carteira de motorista do segundo condutor do veículo é obrigatório', 422)
            } else if (!secondDriver.licenseDocument.licenseCategory) {
                throw new CustomError('A categoria da carteira de motorista do segundo condutor do veículo é obrigatório', 422)
            } else if (!Object.values(LicenseCategory).includes(secondDriver.licenseDocument.licenseCategory)) {
                throw new CustomError('A categoria da carteira de motorista do segundo condutor informada não existe', 422)
            }
        }
    } else if (alieneted) {
        if (!bank) {
            throw new CustomError('O banco responsável pelo financiamento do veículo é obrigatório', 422)
        } else if (!financedAmount) {
            throw new CustomError('O valor do financiamento do veículo é obrigatório', 422)
        }
    }

    next()
}

export { validateEditFields }
