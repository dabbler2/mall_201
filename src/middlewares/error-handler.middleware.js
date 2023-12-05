export default function (e, req, res, next) {
  console.error(e)
  // 마지막에 e.message 지우기
  res.status(!e.code || e.code===200? 500:e.code).json({ message: e.message||'서버 내부 에러가 발생했습니다.' })
}