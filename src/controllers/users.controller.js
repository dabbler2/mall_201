import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

export class UsersController {
    constructor(usersService) {
        this.usersService = usersService
    }

    // 회원가입
    signUp = async (req, res, next) => {
        try {
            const {email, userName, password, confirmPW} = req.body
            if (!email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) || email.length > 70)
                return res
                    .status(400)
                    .json({message: '이메일이 형식에 맞지 않거나 70글자를 초과합니다.'})
            if (!userName || userName.length > 50)
                return res.status(400).json({message: '이름은 1글자 이상 50글자 이하여야 합니다.'})
            if (!password || password.length < 6 || password.length > 50)
                return res
                    .status(400)
                    .json({message: '비밀번호는 6글자 이상 50글자 이하여야 합니다.'})
            if (password !== confirmPW)
                return res.status(400).json({message: '확인용 비밀번호가 일치하지 않습니다.'})
            const hashPW = bcrypt.hashSync(password, +process.env.SALT_ROUND)
            const createdUser = await this.usersService.createUser(email, userName, hashPW)
            return res.status(201).json({email, userName, message: '회원가입이 완료되었습니다.'})
        } catch (e) {
            if (e.code === 409)
                return res.status(409).json({message: '이메일이 이미 사용중입니다.'})
            next(e)
        }
    }

    // 로그인
    signIn = async (req, res, next) => {
        const {email, password} = req.body
        if (!email || !password)
            return res.status(400).json({message: '이메일이나 비밀번호를 확인해주세요.'})
        const existUser = await this.usersService.findUser({email})
        if (!existUser || !bcrypt.compareSync(password, existUser.hashPW))
            return res.status(400).json({message: '이메일이나 비밀번호를 확인해주세요.'})
        const accessToken = jwt.sign({userId: existUser.userId}, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE + 'm'
        })
        const refreshToken = jwt.sign({userId: existUser.userId}, process.env.REFRESH_TOKEN_KEY, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE + 'd'
        })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRE * 60000)
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRE * 86400000)
        })
        await this.usersService.updateUser(existUser.userId, {refreshToken})
        res.json({email, message: '로그인에 성공했습니다.'})
    }

    // 사용자 정보 보기
    getUserInfo = async (req, res, next) => {
        const userId = +req.params.userId
        const existUser = await this.usersService.findUser({userId})
        if (!existUser) return res.status(404).json({message: '해당 사용자가 존재하지 않습니다.'})
        const {email, userName, createdAt} = existUser
        res.json({email, userName, createdAt, message: '사용자 정보를 불러왔습니다.'})
    }

    // 내 정보 수정
    updateUserInfo = async (req, res, next) => {
        try {
            const userId = +req.params.userId
            if (userId !== res.locals.userId)
                return res.status(401).json({message: '회원 정보 수정 권한이 없습니다.'})
            const {userName, password} = req.body
            if (!userName && !password)
                return res.status(400).json({message: '수정할 내용을 입력해주세요.'})
            if (userName && userName.length > 50)
                return res.status(400).json({message: '이름은 1글자 이상 50글자 이하여야 합니다.'})
            if (password && (password.length < 6 || password.length > 50))
                return res
                    .status(400)
                    .json({message: '비밀번호는 6글자 이상 50글자 이하여야 합니다.'})
            const hashPW = password ? bcrypt.hashSync(password, +process.env.SALT_ROUND) : undefined
            await this.usersService.updateUser(userId, {userName, hashPW})
            res.status(201).json({message: '회원정보를 수정했습니다.'})
        } catch (e) {
            next(e)
        }
    }

    // 회원탈퇴
    resign = async (req, res, next) => {
        try {
            const userId = +req.params.userId
            if (userId !== res.locals.userId)
                return res.status(401).json({message: '탈퇴 권한이 없습니다.'})
            await this.usersService.deleteUser(userId)
            res.redirect(303, '/')
        } catch (e) {
            next(e)
        }
    }
}
