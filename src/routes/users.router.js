import express from 'express'
import {prisma} from '../utils/prisma/index.js'
import {UsersRepository} from '../repositories/users.repository.js'
import {UsersService} from '../services/users.service.js'
import {UsersController} from '../controllers/users.controller.js'
import {needSignIn} from '../middlewares/need-signin.middleware.js'

const router = express.Router()

const usersRepository = new UsersRepository(prisma)
const usersService = new UsersService(usersRepository)
const usersController = new UsersController(usersService)

// 회원가입
router.post('/auth/signUp', usersController.signUp)

// 로그인
router.post('/auth/signIn', usersController.signIn)

// 사용자 정보 보기
router.get('/users/:userId', usersController.getUserInfo)

// 내 정보 수정
router.patch('/users/:userId', needSignIn, usersController.updateUserInfo)

// 회원탈퇴
router.delete('/users/:userId', needSignIn, usersController.resign)

router.get('/', async (req, res) => {
    res.json('Hi')
})

export default router
