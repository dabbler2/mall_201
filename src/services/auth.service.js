export class AuthService{
	constructor(usersRepository){
		this.usersRepository = usersRepository
	}
	
	// 계정 생성
	createUser = async (email, userName, password) => {
		const existUser = await this.usersRepository.findUser(email)
		if(existUser) throw {code:400,message:'이메일이 이미 사용중입니다.'}
		const createdUser = await this.usersRepository.createUser(email,userName,password)
		return createdUser
	}
	
	// 계정 검색
	findUser = async email => await this.usersRepository.findUser(email)
}