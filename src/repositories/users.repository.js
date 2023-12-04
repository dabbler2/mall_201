export class UsersRepository{
	constructor(prisma){
		this.prisma = prisma
	}
	
	findUser = async (email) => {
		const existUser = await this.prisma.users.findUnique({where: {email}})
		return existUser
	}
	
	createUser = async (email, userName, password) => {
		try{
			const createdUser = await this.prisma.users.create({
				data:{email,userName,hashPW:password}
			})
		}catch(e){next(e)}
	}
}