export default function (e, req, res, next) {
  console.error(e)
  res.status(!e.code || e.code===200? 500:code).json({ errorMessage: e.message||'서버 내부 에러가 발생했습니다.' })
}