import jwt from 'jsonwebtoken'
import { prisma } from '../utils/prisma/index.js'
import { UsersRepository } from '../repositories/users.repository.js'
import { UsersService } from '../services/users.service.js'
import dotenv from 'dotenv'
dotenv.config()

const usersRepository = new UsersRepository(prisma)
const usersService = new UsersService(usersRepository)

export const needSignIn = async(req,res,next) => {
	const accessToken = req.cookies.accessToken
	if(!accessToken) return res.status(401).json({message:'로그인이 필요한 페이지입니다.'})
	
	try{
		const {userId} = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY)
		const user = await usersService.findUser({userId})
		if(!user) return res.status(401).json({message:'로그인이 필요한 페이지입니다.'})
		res.locals.userId = userId
		res.locals.userName = user.userName
		next()
	}catch(e){next(e)}
}