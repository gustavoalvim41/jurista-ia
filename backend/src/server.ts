import express from 'express'
import { ChromaClient } from 'chromadb'
import cors from 'cors'
import dotenv from 'dotenv'
import ingestRoutes from './routes/ingest.routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json());
app.use('/api', ingestRoutes);

app.get('/', (req, res) => {
  res.json({ status: "ok" });
})

const chroma = new ChromaClient({
  host: process.env.CHROMA_HOST || "localhost",
  port: parseInt(process.env.CHROMA_PORT || "8000", 10),
  ssl: false
});

async function startDb() {
  try {
    await chroma.getOrCreateCollection({ name: "document_vectors" });
    console.log("ChromaDB Ready");
  } catch (err) {
    console.error("Erro ao conectar com ChromaDB:", err);
  }
}

startDb()

const PORT = parseInt(process.env.PORT || "3000", 10);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export { chroma };
