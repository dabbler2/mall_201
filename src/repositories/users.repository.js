export class UsersRepository{
	constructor(prisma){
		this.prisma = prisma
	}
	
	// 계정 생성
	createUser = async (email, userName, hashPW) => {
		try{
			const createdUser = await this.prisma.users.create({
				data:{email,userName,hashPW}
			})
		}catch(e){next(e)}
	}
	
	// 계정 검색
	findUser = async (email) => {
		const existUser = await this.prisma.users.findUnique({where: {email}})
		return existUser
	}
}