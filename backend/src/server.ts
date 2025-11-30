import express from 'express'
import { ChromaClient } from 'chromadb'
import cors from 'cors'
import dotenv from 'dotenv'
import ingestRoutes from './routes/ingest.routes'
import questRoutes from './routes/quest.routes'
import { COLLECTION_NAME } from "./constants";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json());
app.use('/api', ingestRoutes);
app.use('/api', questRoutes);

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
    await chroma.getOrCreateCollection({ name: COLLECTION_NAME });
    console.log(`choromaDB running on port ${process.env.CHROMA_PORT}`);
  } catch (err) {
    console.error("erro ao conectar com ChromaDB:", err);
  }
}

startDb()

const PORT = parseInt(process.env.PORT || "3000", 10);
app.listen(PORT, () => console.log(`server running on port ${PORT}`))

export { chroma };
