import express from 'express'
import { createUserController } from '../Controllers/User/createUserController'
import { deleteUserController } from '../Controllers/User/deleteUserController'
import { editPasswordUserController } from '../Controllers/User/editPasswordUserController'
import { editUserController } from '../Controllers/User/editUserController'
import { getAllUsersController } from '../Controllers/User/getAllUsersController'
import { verifyRoles } from '../helpers/verifyRoles'
import { verifyToken } from '../helpers/verifyToken'
import { validateCreateFields } from '../middlewares/User/validateCreateFields'
import { validateUpdateFields } from '../middlewares/User/validateUpdateFields'
import { validateUpdatePasswordFields } from '../middlewares/User/validateUpdatePasswordFields'
import { Role } from '../utils/enum'
import { addUserInBusinessUnitController } from '../Controllers/User/addUserInBusinessUnitController'
import { removeUserOfBusinessUnitController } from '../Controllers/User/removeUserOfBusinessUnitController'
import { getUserById } from '../Controllers/User/getUserById'
import { activateUserController } from '../Controllers/User/activateUserController'
import { inactivateUserController } from '../Controllers/User/inactivateUserController'
import { verifyIfUserIsActive } from '../helpers/verifyIfUserIsActive'

const router = express.Router()

router.use(verifyToken)
router.use(verifyIfUserIsActive)

router.post(
    '/',
    validateCreateFields,
    verifyRoles([Role.HIGH, Role.MEDIUM]),
    createUserController
)

router.delete(
    '/:id',
    verifyRoles([Role.HIGH]),
    deleteUserController
)

router.patch(
    '/:id',
    validateUpdateFields,
    verifyRoles([Role.HIGH]),
    editUserController
)

router.patch(
    '/password/:id',
    validateUpdatePasswordFields,
    verifyRoles([Role.HIGH]),
    editPasswordUserController
)

router.get(
    '/',
    verifyRoles([Role.HIGH]),
    getAllUsersController
)

router.post(
    '/allocate',
    verifyRoles([Role.HIGH, Role.MEDIUM]),
    addUserInBusinessUnitController
)

router.post(
    '/deallocate',
    verifyRoles([Role.HIGH, Role.MEDIUM]),
    removeUserOfBusinessUnitController
)

router.get(
    '/:id',
    verifyRoles([Role.HIGH, Role.MEDIUM]),
    getUserById
)

router.patch(
    '/activate/:id',
    verifyRoles([Role.HIGH]),
    activateUserController
)

router.patch(
    '/inactivate/:id',
    verifyRoles([Role.HIGH]),
    inactivateUserController
)

export { router as userRoutes }
