import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import lettersRouter from './routes/letters.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/letters', lettersRouter)

// Root handler so visiting http://localhost:PORT/ returns a message
app.get('/', (_req, res) => {
	res.send('<h1>Letter2You Backend</h1><p>Visit <a href="/api/letters">/api/letters</a></p>')
})

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

export default app
