import express from 'express'
import { verifyIfUserIsActive } from '../helpers/verifyIfUserIsActive'
import { verifyToken } from '../helpers/verifyToken'
import { editTransactionController } from '../Controllers/Transaction/editTransactionController'

const router = express.Router()

router.use(verifyToken)
router.use(verifyIfUserIsActive)

router.put(
    '/:id',
    editTransactionController
)

export { router as transactionRoutes }
