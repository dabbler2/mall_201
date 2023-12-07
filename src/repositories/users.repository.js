export class UsersRepository {
    constructor(prisma) {
        this.prisma = prisma
    }

    // 계정 생성
    createUser = async (email, userName, hashPW) =>
        await this.prisma.users.create({data: {email, userName, hashPW}})

    // 계정 검색
    findUser = async userInfo => {
        const existUser = await this.prisma.users.findUnique({where: userInfo})
        return existUser
    }

    // 계정 정보 업데이트
    updateUser = async (userId, userInfo) =>
        await this.prisma.users.update({where: {userId}, data: userInfo})

    // 계정 삭제
    deleteUser = async userId => await this.prisma.users.delete({where: {userId}})
}
