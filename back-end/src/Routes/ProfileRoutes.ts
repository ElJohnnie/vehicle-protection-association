import express from 'express'
import { verifyIfUserIsActive } from '../helpers/verifyIfUserIsActive'
import { verifyToken } from '../helpers/verifyToken'
import { editProfileController } from '../Controllers/Profile/editProfileController'
import { editPasswordProfileController } from '../Controllers/Profile/editPasswordProfileController'
import { getMyProfileController } from '../Controllers/Profile/getMyProfileController'
import { validateUpdateFields } from '../middlewares/Profile/validateUpdateFields'
import { validateUpdatePasswordFields } from '../middlewares/Profile/validateUpdatePasswordFields'

const router = express.Router()

router.use(verifyToken)
router.use(verifyIfUserIsActive)

router.patch(
    '/edit',
    validateUpdateFields,
    editProfileController
)

router.patch(
    '/edit/password',
    validateUpdatePasswordFields,
    editPasswordProfileController
)

router.get(
    '/myProfile',
    getMyProfileController
)

export { router as profileRoutes }
