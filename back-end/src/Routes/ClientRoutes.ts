import express from 'express'
import { createClientController } from '../Controllers/Client/createClientController'
import { deleteClientController } from '../Controllers/Client/deleteClientController'
import { editClientController } from '../Controllers/Client/editClientController'
import { getAllClientsController } from '../Controllers/Client/getAllClientsController'
import { getClientByIdController } from '../Controllers/Client/getClientByIdController'
import { verifyRoles } from '../helpers/verifyRoles'
import { verifyToken } from '../helpers/verifyToken'
import { validateCreateFields } from '../middlewares/Client/validateCreateFields'
import { Role } from '../utils/enum'
import { verifyIfUserIsActive } from '../helpers/verifyIfUserIsActive'
import { activateClientController } from '../Controllers/Client/activateClientController'
import { inactivateClientController } from '../Controllers/Client/inactivateClientController'
import { validateEditFields } from '../middlewares/Client/validateEditFields'

const router = express.Router()

router.use(verifyToken)
router.use(verifyIfUserIsActive)

router.post(
    '/',
    validateCreateFields,
    createClientController
)

router.get(
    '/',
    verifyRoles([Role.HIGH]),
    getAllClientsController
)

router.put(
    '/:id',
    validateEditFields,
    editClientController
)

router.delete(
    '/:id',
    verifyRoles([Role.HIGH]),
    deleteClientController
)

router.get(
    '/:id',
    verifyToken,
    getClientByIdController
)

router.patch(
    '/activate/:id',
    activateClientController
)

router.patch(
    '/inactivate/:id',
    inactivateClientController
)

export { router as clientRoutes }
