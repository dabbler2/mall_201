import express from 'express'

const app = express()

app.use(express.json())
app.get('/', (req, res) => res.send('Welcome to mall_201'))
app.listen(process.env.PORT || 7777, () => console.log('Server working...'))