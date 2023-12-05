export class UsersRepository{
	constructor(prisma){
		this.prisma = prisma
	}
	
	// 계정 생성
	createUser = async (email, userName, hashPW) => await this.prisma.users.create({data:{email,userName,hashPW}})
	
	// 계정 검색
	findUser = async (userInfo) => {
		const existUser = await this.prisma.users.findUnique({where:userInfo})
		return existUser
	}
}