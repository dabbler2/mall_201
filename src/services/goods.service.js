export class GoodsService {
    constructor(goodsRepository) {
        this.goodsRepository = goodsRepository
    }

    // 상품 목록 불러오기
    getGoods = async () => await this.goodsRepository.getGoods()

    // 상품 검색
    findGood = async goodId => await this.goodsRepository.findGood(goodId)

    // 상품 등록
    createGood = async (goodName, userName, userId, content) =>
        await this.goodsRepository.createGood(goodName, userName, userId, content)

    // 상품 정보 수정
    updateGood = async (goodId, goodName, content, status) =>
        await this.goodsRepository.updateGood(goodId, goodName, content, status)

    // 상품 삭제
    deleteGood = async goodId => await this.goodsRepository.deleteGood(goodId)
}
