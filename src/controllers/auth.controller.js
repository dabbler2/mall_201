export class AuthController {
	constructor(authService){
		this.authService = authService
	}
	
	signUp = async (req,res,next) => {
		try{
			const {email, userName, password, confirmPW} = req.body
			if (!email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) || email.length > 70)
				return res.status(400).json({message: '이메일이 형식에 맞지 않거나 70글자를 초과합니다.'})
			if (!userName || userName.length > 50)
				return res.status(400).json({message: '이름은 1글자 이상 50글자 이하여야 합니다.'})
			if (password.length < 6 || password.length > 50)
				return res.status(400).json({message: '비밀번호는 6글자 이상 50글자 이하여야 합니다.'})
			if (password !== confirmPW)
				return res.status(400).json({message: '확인용 비밀번호가 일치하지 않습니다.'})
			const createdUser = await this.authService.createUser(email,userName,password)
			return res.status(201).json({email,userName,message:'회원가입이 완료되었습니다.'})
		}catch(e){next(e)}
	}
}