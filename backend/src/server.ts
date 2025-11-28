import express from 'express'
import ingestRoutes from './routes/ingest.routes'

const app = express()
app.use(express.json())

app.use(express.json());
app.use('/api', ingestRoutes);

app.get('/', (req, res) => {
  res.json({ status: "ok" });
})

app.listen(3000, () => console.log('Server running on port 3000'))
