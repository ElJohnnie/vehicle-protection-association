import { Request, Response } from 'express'
import { getToken } from '../../helpers/getToken'
import { getUserByToken } from '../../helpers/getUserByToken'

const getMyBusinessUnitsController = async (req: Request, res:Response) => {
    const token = getToken(req)
    const userToken = await getUserByToken(token)

    const myUnits = [...userToken.managerUnits, ...userToken.units]

    let myDistinctUnits = []

    myUnits.forEach(unit => {
        if (!myDistinctUnits.find(item => item.id === unit.id)) {
            myDistinctUnits.push(unit)
        }
    })

    res.status(200).json({
        myBusinessUnits: myDistinctUnits
    })
}

export { getMyBusinessUnitsController }
