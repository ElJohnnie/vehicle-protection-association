import express from 'express'
import { createVehicleController } from '../Controllers/Vehicle/createVehicleController'
import { deleteVehicleController } from '../Controllers/Vehicle/deleteVehicleController'
import { verifyToken } from '../helpers/verifyToken'
import { getVehicleByIdController } from '../Controllers/Vehicle/getVehicleByIdController'
import { getAllVehiclesByClientIdController } from '../Controllers/Vehicle/getAllVehiclesByClientIdController'
import { getAllVehiclesController } from '../Controllers/Vehicle/getAllVehiclesController'
import { verifyIfUserIsActive } from '../helpers/verifyIfUserIsActive'
import { editVehicleController } from '../Controllers/Vehicle/editVehicleController'
import { validateCreateFields } from '../middlewares/Vehicle/validateCreateFields'
import { validateEditFields } from '../middlewares/Vehicle/validateEditFields'
import { getVehicleByLicensePlateController } from '../Controllers/Vehicle/getVehicleByLicensePlateController'

const router = express.Router()

router.use(verifyToken)
router.use(verifyIfUserIsActive)

router.post(
    '/',
    validateCreateFields,
    createVehicleController
)

router.put(
    '/:id',
    validateEditFields,
    editVehicleController

)

router.delete(
    '/:id',
    deleteVehicleController
)

router.get(
    '/',
    getAllVehiclesController
)

router.get('/:id',
    getVehicleByIdController)

router.get(
    '/client/:clientId',
    getAllVehiclesByClientIdController
)

router.get(
    '/license/plate/:licensePlate',
    getVehicleByLicensePlateController
)

export { router as vehicleRoutes }
