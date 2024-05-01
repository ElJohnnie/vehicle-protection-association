import express from 'express'
import { createContractController } from '../Controllers/Contract/createContractController'
import { verifyIfUserIsActive } from '../helpers/verifyIfUserIsActive'
import { verifyToken } from '../helpers/verifyToken'
import { editContractController } from '../Controllers/Contract/editContractController'
import { deleteContractController } from '../Controllers/Contract/deleteContractController'
import { getContractByVehicleUniqueKey } from '../Controllers/Contract/getContractByVehicleUniqueKey'
import { getAllContracts } from '../Controllers/Contract/getAllContracts'
import { getTransactionByContract } from '../Controllers/Transaction/getTransactionsByContract'
import { getCarneContractController } from '../Controllers/Contract/getCarneContractController'

const router = express.Router()

router.use(verifyToken)
router.use(verifyIfUserIsActive)

router.post(
    '/',
    createContractController
)

router.get(
    '/:id/carne',
    getCarneContractController
)

router.put(
    '/:id',
    editContractController
)

router.delete(
    '/:id',
    deleteContractController
)

router.get(
    '/:id/transactions',
    getTransactionByContract
)

router.get(
    '/:id',
    getContractByVehicleUniqueKey
)

router.get(
    '/',
    getAllContracts
)

export { router as contractRoutes }
