export class UsersService{
	constructor(usersRepository){
		this.usersRepository = usersRepository
	}
	
	// 계정 생성
	createUser = async (email, userName, password) => {
		try{
			const existUser = await this.usersRepository.findUser({email})
			if(existUser) throw {code:400,message:'이메일이 이미 사용중입니다.'}
			await this.usersRepository.createUser(email,userName,password)
		}catch(e){throw e}
	}
	
	// 계정 검색
	findUser = async userInfo => await this.usersRepository.findUser(userInfo)
}