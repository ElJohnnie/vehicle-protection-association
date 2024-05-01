import express from 'express'
import { verifyToken } from '../helpers/verifyToken'
import { verifyIfUserIsActive } from '../helpers/verifyIfUserIsActive'
import { validateCreateFields } from '../middlewares/Event/validateCreateFields'
import { createEventController } from '../Controllers/Event/createEventController'
import { validateEditFields } from '../middlewares/Event/validateEditFields'
import { editEventController } from '../Controllers/Event/editEventController'
import { deleteEventController } from '../Controllers/Event/deleteEventController'
import { getEventByIdController } from '../Controllers/Event/getEventByIdController'
import { getAllEventsController } from '../Controllers/Event/getAllEventsController'
import { getEventsByVehicleController } from '../Controllers/Event/getEventsByVehicleController'

const router = express.Router()

router.use(verifyToken)
router.use(verifyIfUserIsActive)

router.post(
    '/',
    validateCreateFields,
    createEventController
)

router.put(
    '/:id',
    validateEditFields,
    editEventController
)

router.delete(
    '/:id',
    deleteEventController
)

router.get(
    '/vehicle/:id',
    getEventsByVehicleController
)

router.get(
    '/',
    getAllEventsController
)

router.get(
    '/:id',
    getEventByIdController
)

export { router as eventRoutes }
