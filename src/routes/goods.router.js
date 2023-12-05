import express from 'express'
import { prisma } from '../utils/prisma/index.js'
import { GoodsRepository } from '../repositories/goods.repository.js'
import { GoodsService } from '../services/goods.service.js'
import { GoodsController } from '../controllers/goods.controller.js'

const router = express.Router()

const goodsRepository = new GoodsRepository(prisma)
const goodsService = new GoodsService(goodsRepository)
const goodsController = new GoodsController(goodsService)

export default router