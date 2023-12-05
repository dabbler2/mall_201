import express from 'express'
import authRouter from './routes/auth.router.js'
import errorMiddleware from "./middlewares/error-handler.middleware.js"
const app = express()

app.use(express.json())
app.use('/api',[authRouter])
app.use(errorMiddleware)

app.get('/', (req, res) => res.send('Welcome to mall_201'))
app.listen(process.env.PORT || 7777, () => console.log('Server working...'))