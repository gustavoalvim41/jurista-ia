import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ingestRoutes from './routes/ingest.routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.json());
app.use('/api', ingestRoutes);

app.get('/', (req, res) => {
  res.json({ status: "ok" });
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
