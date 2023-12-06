export class GoodsService {
	constructor(goodsRepository){this.goodsRepository = goodsRepository}
	
	createGood = async (goodsName, userName, userId, content) => await this.goodsRepository.createGood(goodsName, userName, userId, content)
	
	findGood = async(goodsId) => {
		const good = await this.goodsRepository.findGood(goodsId)
		if(!good) throw {code:400, message:"해당 상품이 없습니다."}
		return good
	}
	
	getGoods = async () => await this.goodsRepository.getGoods()
	
	updateGood = async(goodsId,goodsName,content,status) => {
		try{
			return await this.goodsRepository.updateGood(goodsId,goodsName,content,status)
		}catch(e){throw e}
	}
	
	deleteGood = async(goodsId) => {
		try{
			await this.goodsRepository.deleteGood(goodsId)
		}catch(e){throw e}
	}
}