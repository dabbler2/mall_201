export class AuthService{
	constructor(usersRepository){
		this.usersRepository = usersRepository
	}
	
	createUser = async (email, userName, password) => {
		const existUser = await this.usersRepository.findUser(email)
		if(existUser) return res.status(400).json({message: '이메일이 이미 사용중입니다.'})
		const createdUser = await this.usersRepository.createUser(email,userName,password)
		return createdUser
	}
}