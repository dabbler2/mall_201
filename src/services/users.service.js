export class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository
    }

    // 계정 생성
    createUser = async (email, userName, password) => {
        try {
            const existUser = await this.usersRepository.findUser({email})
            if (existUser) throw {code: 409, message: '이메일이 이미 사용중입니다.'}
            await this.usersRepository.createUser(email, userName, password)
        } catch (e) {
            throw e
        }
    }

    // 계정 검색
    findUser = async userInfo => await this.usersRepository.findUser(userInfo)

    // 계정 정보 업데이트
    updateUser = async (userId, userInfo) => await this.usersRepository.updateUser(userId, userInfo)

    // 계정 삭제
    deleteUser = async userId => await this.usersRepository.deleteUser(userId)
}
