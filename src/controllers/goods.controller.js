export class GoodsController {
	constructor(goodsService){this.goodsService = goodsService}
	
	// 전체 상품 조회
	getGoods = async (req,res) => res.json({goods:await this.goodsService.getGoods()})
	
	// 상품 상세 조회
	getGoodDetail = async(req,res,next) => {
		try{
			const goodId = +req.params.goodId
			const good = await this.goodsService.findGood(goodId)
			res.json({good})
		}catch(e){
			if(e.code===400) return res.status(400).json({message: e.message})
			next(e)
		}
	}
	
	// 상품 등록
	postGood = async(req,res,next) => {
		try{
			const {goodName, content} = req.body
			if (!goodName)
				return res.status(400).json({message: '상품명을 입력해주세요.'})
			// 인증 추가
			const userId = res.locals.userId
			const userName = res.locals.userName
			await this.goodsService.createGood(goodName, userName, userId, content)
			res.status(201).json({goodName, content, message: '상품이 등록되었습니다.'})
		}catch(e){next(e)}
	}
	
	// 상품 수정
	updateGood = async(req,res,next) => {
		try{
			const goodId = +req.params.goodId
			const {goodName, content} = req.body
			let status = req.body.status
			if(!goodName && !content && !status) return res.status(400).json({message: '수정할 내용을 입력해주세요.'})
			if(status!==undefined && status!=='SOLD_OUT') status = 'FOR_SALE'
			const good = await this.goodsService.findGood(goodId)
			if(!good) return res.status(400).json({message: '해당 상품이 없습니다.'})
			if(good.userId!==res.locals.userId) return res.status(401).json({message: '수정 권한이 없습니다.'})
			const updatedGood = await this.goodsService.updateGood(goodId,goodName,content,status,res.locals.userId)
			res.status(201).json({updatedGood})
		}catch(e){
			if(e.code===400) return res.status(400).json({message: e.message})
			next(e)
		}
	}
	
	// 상품 삭제
	deleteGood = async(req,res,next) => {
		try{
			const goodId = +req.params.goodId
			const good = await this.goodsService.findGood(goodId)
			if(!good) return res.status(400).json({message: '해당 상품이 없습니다.'})
			if(good.userId!==res.locals.userId) return res.status(401).json({message: '삭제 권한이 없습니다.'})
			await this.goodsService.deleteGood(goodId)
			res.redirect(303, '/api/goods')
		}catch(e){
			if(e.code===400) return res.status(400).json({message: e.message})
			next(e)
		}
	}
}