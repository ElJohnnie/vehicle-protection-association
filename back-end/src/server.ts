import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import 'dotenv/config'
import { userRoutes } from './Routes/UserRoutes'
import { authRoutes } from './Routes/AuthRoutes'
import { clientRoutes } from './Routes/ClientRoutes'
import { businessUnitRoutes } from './Routes/BusinessUnitRoutes'
import { profileRoutes } from './Routes/ProfileRoutes'
import { planRoutes } from './Routes/PlanRoutes'
import { vehicleRoutes } from './Routes/VehicleRoutes'
import { eventRoutes } from './Routes/EventRoutes'
import { verifyErrors } from './helpers/verifyErrors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'
import { contractRoutes } from './Routes/ContractRoutes'
import { transactionRoutes } from './Routes/TransactionRoutes'
import { verificationRoutes } from './Routes/VerificationRoutes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* app.use(
    cors({
        credentials: true,
        origin: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`
    })
) */

app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/client', clientRoutes)
app.use('/unit', businessUnitRoutes)
app.use('/profile', profileRoutes)
app.use('/plan', planRoutes)
app.use('/vehicle', vehicleRoutes)
app.use('/event', eventRoutes)
app.use('/contract', contractRoutes)
app.use('/transaction', transactionRoutes)
app.use('/verification', verificationRoutes)

app.use(verifyErrors)

const start = async () => {
    await app.listen(process.env.PORT, () => {
        console.log(
            `🚀 Server started in PORT ${process.env.PORT} 🚀`
        )
    })
}

start()
