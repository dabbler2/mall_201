export class GoodsRepository {
    constructor(prisma) {
        this.prisma = prisma
    }

    // 상품 목록 불러오기
    getGoods = async () => await this.prisma.goods.findMany()

    // 상품 검색
    findGood = async goodId => await this.prisma.goods.findUnique({where: {goodId}})

    // 상품 등록
    createGood = async (goodName, userName, userId, content) =>
        await this.prisma.goods.create({data: {goodName, userName, userId, content}})

    // 상품 수정
    updateGood = async (goodId, goodName, content, status) =>
        await this.prisma.goods.update({where: {goodId}, data: {goodName, content, status}})

    // 상품 삭제
    deleteGood = async goodId => await this.prisma.goods.delete({where: {goodId}})
}
