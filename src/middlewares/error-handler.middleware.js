export default function (e, req, res, next) {
  console.error(e)
  res.status(e.code!==200? e.code:500).json({ errorMessage: e.message||'서버 내부 에러가 발생했습니다.' })
}