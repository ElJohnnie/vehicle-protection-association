import express from 'express'
import { createBusinessUnitController } from '../Controllers/BusinessUnit/createBusinessUnitController'
import { verifyRoles } from '../helpers/verifyRoles'
import { Role } from '../utils/enum'
import { verifyToken } from '../helpers/verifyToken'
import { getUsersByBusinessUnitController } from '../Controllers/BusinessUnit/getUsersByBusinessUnitController'
import { verifyIfUserIsActive } from '../helpers/verifyIfUserIsActive'
import { deleteBusinessUnitController } from '../Controllers/BusinessUnit/deleteBusinessUnitController'
import { getBusinessUnitByIdController } from '../Controllers/BusinessUnit/getBusinessUnitByIdController'
import { getAllBusinessUnitsController } from '../Controllers/BusinessUnit/getAllBusinessUnitsController'
import { getMyBusinessUnitsController } from '../Controllers/BusinessUnit/getMyBusinessUnitsController'
import { addManagerInBusinessUnitController } from '../Controllers/BusinessUnit/addManagerInBusinessUnitController'
import { removeManagerOfBusinessUnitController } from '../Controllers/BusinessUnit/removeManagerOfBusinessUnitController'
import { editBusinessUnitController } from '../Controllers/BusinessUnit/editBusinessUnitController'
import { getClientsByBusinessUnitController } from '../Controllers/BusinessUnit/getClientsByBusinessUnitController'
import { validateCreateFields } from '../middlewares/BusinessUnit/validateCreateFields'
import { validateEditFields } from '../middlewares/BusinessUnit/validateEditFields'
import { validateRemoveManagerFields } from '../middlewares/BusinessUnit/validateRemoveManagerFields'
import { valideteAddManagerFields } from '../middlewares/BusinessUnit/validateAddManagerFields'

const router = express.Router()

router.use(verifyToken)
router.use(verifyIfUserIsActive)

router.post(
    '/',
    verifyRoles([Role.HIGH]),
    validateCreateFields,
    createBusinessUnitController
)

router.put(
    '/:id',
    verifyRoles([Role.HIGH]),
    validateEditFields,
    editBusinessUnitController
)

router.delete(
    '/:id',
    verifyRoles([Role.HIGH]),
    deleteBusinessUnitController
)

router.get(
    '/:id/users',
    verifyRoles([Role.HIGH, Role.MEDIUM]),
    getUsersByBusinessUnitController
)

router.get(
    '/:id/clients',
    getClientsByBusinessUnitController
)

router.get(
    '/myUnits',
    getMyBusinessUnitsController
)

router.get(
    '/:id',
    getBusinessUnitByIdController
)

router.get(
    '/',
    verifyRoles([Role.HIGH]),
    getAllBusinessUnitsController
)

router.post(
    '/add/manager',
    verifyRoles([Role.HIGH]),
    valideteAddManagerFields,
    addManagerInBusinessUnitController
)

router.post(
    '/remove/manager',
    verifyRoles([Role.HIGH]),
    validateRemoveManagerFields,
    removeManagerOfBusinessUnitController
)

export { router as businessUnitRoutes }
