import express from 'express'
import { generateRefreshToken } from '../Controllers/Auth/generateRefreshTokenController'
import { loginController } from '../Controllers/Auth/loginController'
import { validateLoginFields } from '../middlewares/Auth/validateLoginFields'
import { validateRefreshTokenFields } from '../middlewares/Auth/validateRefreshTokenFields'

const router = express.Router()

router.post('/refresh-token', validateRefreshTokenFields, generateRefreshToken)
router.post('/login', validateLoginFields, loginController)

export { router as authRoutes }
