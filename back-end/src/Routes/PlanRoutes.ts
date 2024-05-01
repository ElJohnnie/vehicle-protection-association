import express from 'express'
import { verifyIfUserIsActive } from '../helpers/verifyIfUserIsActive'
import { verifyToken } from '../helpers/verifyToken'
import { createPlanController } from '../Controllers/Plan/createPlanController'
import { deletePlanController } from '../Controllers/Plan/deletePlanController'
import { getAllPlansController } from '../Controllers/Plan/getAllPlansController'
import { editPlanController } from '../Controllers/Plan/editPlanController'
import { getPlanByIdController } from '../Controllers/Plan/getPlanByIdController'
import { validateCreateFields } from '../middlewares/Plan/validateCreateFields'
import { validateEditFields } from '../middlewares/Plan/validateEditFields'
import { verifyRoles } from '../helpers/verifyRoles'
import { Role } from '../utils/enum'

const router = express.Router()

router.use(verifyToken)
router.use(verifyIfUserIsActive)

router.post(
    '/',
    validateCreateFields,
    createPlanController
)

router.put(
    '/:id',
    verifyRoles([Role.HIGH]),
    validateEditFields,
    editPlanController
)

router.delete(
    '/:id',
    verifyRoles([Role.HIGH]),
    deletePlanController
)

router.get(
    '/',
    getAllPlansController
)

router.get(
    '/:id',
    getPlanByIdController
)

export { router as planRoutes }
