export class GoodsService {
	constructor(goodsRepository){this.goodsRepository = goodsRepository}
	
	// 상품 목록 불러오기
	getGoods = async () => await this.goodsRepository.getGoods()
	
	// 상품 검색
	findGood = async(goodId) => {
		const good = await this.goodsRepository.findGood(goodId)
		if(!good) throw {code:400, message:"해당 상품이 없습니다."}
		return good
	}
	
	// 상품 등록
	createGood = async (goodName, userName, userId, content) => await this.goodsRepository.createGood(goodName, userName, userId, content)

	// 상품 정보 수정
	updateGood = async(goodId,goodName,content,status) => {
		try{
			return await this.goodsRepository.updateGood(goodId,goodName,content,status)
		}catch(e){throw e}
	}
	
	// 상품 삭제
	deleteGood = async(goodId,userId) => await this.goodsRepository.deleteGood(goodId)
}