import { Request, Response } from 'express'
import { getToken } from '../../helpers/getToken'
import { getUserByToken } from '../../helpers/getUserByToken'
import { excludeFieldUser } from '../User/utils/excludeFieldUser'

const getMyProfileController = async (req: Request, res: Response) => {
    const token = getToken(req)
    const userToken = await getUserByToken(token)

    const user = excludeFieldUser(userToken, ['password'])

    res.status(200).json({
        user
    })
}

export { getMyProfileController }
