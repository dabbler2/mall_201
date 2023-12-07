import jwt from 'jsonwebtoken'
import {prisma} from '../utils/prisma/index.js'
import {UsersRepository} from '../repositories/users.repository.js'
import {UsersService} from '../services/users.service.js'
import dotenv from 'dotenv'
dotenv.config()

const usersRepository = new UsersRepository(prisma)
const usersService = new UsersService(usersRepository)

const res401 = res => res.status(401).json({message: '로그인이 필요한 페이지입니다.'})

// 액세스 토큰 확인
export const needSignIn = async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken) return res401(res)

    try {
        const {userId} = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY)
        const user = await usersService.findUser({userId})
        if (!user) return res401(res)
        res.locals.userId = userId
        res.locals.userName = user.userName
        next()
    } catch (e) {
        if (e.message === 'jwt expired') await checkRefreshToken(req, res, next)
        else next(e)
    }
}

// 리프레시 토큰 확인
const checkRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res401(res)

    try {
        const {userId} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
        console.log(userId)
        const user = await usersService.findUser({userId})
        if (!user || user.refreshToken !== refreshToken) return res401(res)
        const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_KEY, {expiresIn: '20m'})
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1200000)
        })
        res.locals.userId = userId
        res.locals.userName = user.userName
        next()
    } catch (e) {
        res401(res)
    }
}
