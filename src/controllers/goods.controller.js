export class GoodsController {
	constructor(goodsService){this.goodsService = goodsService}
	
	// 상품 등록
	// status도 넣기
	postGood = async(req,res,next) => {
		try{
			const {goodsName, content} = req.body
			if (!goodsName)
				return res.status(400).json({message: '상품명을 입력해주세요.'})
			// 인증 추가
			const userId = 2
			const userName = '2'
			await this.goodsService.createGood(goodsName, userName, userId, content)
			res.status(201).json({goodsName, content, message: '상품이 등록되었습니다.'})
		}catch(e){next(e)}
	}
	
	// 전체 상품 조회
	getGoods = async (req,res) => res.json({goods:await this.goodsService.getGoods()})
	
	// 상품 상세 조회
	getGoodDetail = async(req,res,next) => {
		try{
			const goodsId = +req.params.goodsId
			const good = await this.goodsService.findGood(goodsId)
			res.json({good})
		}catch(e){
			if(e.code===400) return res.status(400).json({message: e.message})
			next(e)
		}
	}
	
	// 상품 수정
	updateGood = async(req,res,next) => {
		try{
			const goodsId = +req.params.goodsId
			const {goodsName, content, status} = req.body
			if(!goodsName && !content && !status) return res.status(401).json({message: '수정할 내용을 입력해주세요.'})
			const good = await this.goodsService.updateGood(goodsId,goodsName,content,status)
			res.status(201).json({good})
		}catch(e){
			if(e.code===400) return res.status(400).json({message: e.message})
			next(e)
		}
	}
	
	// 상품 삭제
	deleteGood = async(req,res,next) => {
		try{
			const goodsId = +req.params.goodsId
			await this.goodsService.deleteGood(goodsId)
			res.redirect(303, '/api/goods')
		}catch(e){
			if(e.code===400) return res.status(400).json({message: e.message})
			next(e)
		}
	}
}