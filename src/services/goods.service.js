export class GoodsService {
	constructor(goodsRepository){this.goodsRepository = goodsRepository}
	
	createGood = async (goodsName, userName, userId, content) => await this.goodsRepository.createGood(goodsName, userName, userId, content)
	
	getGoods = async () => await this.goodsRepository.getGoods()
	
	deleteGood = async(goodsId) => {
		try{
			await this.goodsRepository.deleteGood(goodsId)
		}catch(e){throw e}
	}
}