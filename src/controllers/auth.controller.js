import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

export class AuthController {
	constructor(authService){
		this.authService = authService
	}
	
	// 회원가입
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
			const hashPW = bcrypt.hashSync(password, +process.env.SALT_ROUND)
			const createdUser = await this.authService.createUser(email,userName,hashPW)
			return res.status(201).json({email,userName,message:'회원가입이 완료되었습니다.'})
		}catch(e){next(e)}
	}
	
	// 로그인
	signIn = async(req,res,next) => {
		const {email, password} = req.body
		if(!email || !password) return res.status(400).json({message: '이메일이나 비밀번호를 확인해주세요.'})
		const existUser = await this.authService.findUser(email)
		if(!existUser || !bcrypt.compareSync(password, existUser.hashPW)) return res.status(400).json({message: '이메일이나 비밀번호를 확인해주세요.'})
		const accessToken = jwt.sign({userID: existUser.userID}, process.env.ACCESS_TOKEN_KEY, {expiresIn: '100m'})
		res.cookie('accessToken', accessToken, {httpOnly: true,
            expires: new Date(Date.now()+6000000)})
		res.json({email,message: '로그인에 성공했습니다.'})
	}
}