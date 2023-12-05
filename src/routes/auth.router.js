import express from 'express'
import { prisma } from '../utils/prisma/index.js'
import { UsersRepository } from '../repositories/users.repository.js'
import { AuthService } from '../services/auth.service.js'
import { AuthController } from '../controllers/auth.controller.js'

const router = express.Router()

const usersRepository = new UsersRepository(prisma)
const authService = new AuthService(usersRepository)
const authController = new AuthController(authService)

// 회원가입
router.post('/auth/signUp', authController.signUp)

// 로그인
router.post('/auth/signIn', authController.signIn)

router.get('/', async (req,res) => {
	res.json("Hi")
})

export default router