## Requisitos do Backend (Node.js/TypeScript)

### API de Ingestão

- [x] Criar rota (endpoint) que aceite upload de arquivo .txt ou .pdf.

### Pipeline de RAG (Retrieval-Augmented Generation)

- [x] Implementar lógica para quebrar o texto do documento em chunks.
- [x] Implementar geração de embeddings Cohere .
- [x] Armazenar os vetores em uma estrutura de busca ChromaDB.

### Agente de Consulta (Chat Endpoint)

- [ ] Criar endpoint que receba a pergunta do usuário.
- [ ] Realizar vector search para buscar trechos mais relevantes do contrato.
- [ ] Montar o prompt com contexto + pergunta.
- [ ] Enviar para a LLM e retornar a resposta gerada.

### Rodar DOcker

docker run -p 8000:8000 ghcr.io/chroma-core/chroma:latest