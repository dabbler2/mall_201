import express from 'express'
import { prisma } from '../utils/prisma/index.js'
import { GoodsRepository } from '../repositories/goods.repository.js'
import { GoodsService } from '../services/goods.service.js'
import { GoodsController } from '../controllers/goods.controller.js'

const router = express.Router()

const goodsRepository = new GoodsRepository(prisma)
const goodsService = new GoodsService(goodsRepository)
const goodsController = new GoodsController(goodsService)

// 조회 빼고 인증 넣기

// 전체 상품 조회
router.get('/goods', goodsController.getGoods)

// 상품 상세 조회
router.get('/goods/:goodsId', goodsController.getGoodDetail)

// 상품 등록
router.post('/goods', goodsController.postGood)

// 상품 수정
router.patch('/goods/:goodsId', goodsController.updateGood)

// 상품 삭제
router.delete('/goods/:goodsId', goodsController.deleteGood)

export default router