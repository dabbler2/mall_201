import express from 'express'
import {prisma} from '../utils/prisma/index.js'
import {GoodsRepository} from '../repositories/goods.repository.js'
import {GoodsService} from '../services/goods.service.js'
import {GoodsController} from '../controllers/goods.controller.js'
import {needSignIn} from '../middlewares/need-signin.middleware.js'

const router = express.Router()

const goodsRepository = new GoodsRepository(prisma)
const goodsService = new GoodsService(goodsRepository)
const goodsController = new GoodsController(goodsService)

// 조회 빼고 인증 넣기

// 전체 상품 조회
router.get('/goods', needSignIn, goodsController.getGoods)

// 상품 상세 조회
router.get('/goods/:goodId', goodsController.getGoodDetail)

// 상품 등록
router.post('/goods', needSignIn, goodsController.postGood)

// 상품 수정
router.patch('/goods/:goodId', needSignIn, goodsController.updateGood)

// 상품 삭제
router.delete('/goods/:goodId', needSignIn, goodsController.deleteGood)

export default router
