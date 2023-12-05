export class GoodsRepository {
	constructor(prisma){this.prisma = prisma}
	
	createGood = async (goodsName, userName, userId, content) => await this.prisma.goods.create({data:{goodsName, userName, userId, content}})
	
	getGoods = async () => await this.prisma.goods.findMany()
	
	findGood = async(goodsId) => await this.prisma.goods.findUnique({where:{goodsId}})
	
	deleteGood = async(goodsId) => {
		try{
			await this.prisma.goods.delete({where:{goodsId}})
		}catch(e){
			throw {code:400, message:"해당 상품이 없습니다."}
		}
	}
}