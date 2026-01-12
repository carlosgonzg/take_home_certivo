# Technical Take-Home Assignment: Regulation Document Chatbot

This is a full-stack chatbot application that answers questions about compliance documents using a pre-built knowledge base.

LOOM Video: https://www.loom.com/share/826e63ea92cf48a895c6a7946df389fe

---

## Architecture Overview

```
Angular (Standalone UI)
        ↓
REST API
        ↓
NestJS Backend
        ↓
Vector Search (FAISS)
        ↓
LLM (OpenAI)
```

### Key Features
- Pre-ingested compliance documents
- Natural language question answering
- Source attribution per answer
- Modular NestJS backend
- Modern Angular standalone frontend
- No low-code or auto-generated chatbot platforms

---

## Tech Stack

### Backend
- NestJS (TypeScript)
- LangChain
- FAISS (vector store)
- OpenAI
- PDF & HTML document loaders

### Frontend
- Angular (standalone components)
- Angular Signals
- TailwindCSS

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- OpenAI API key

---

## Backend Setup (NestJS)

This is the .env file

```bash
PORT=3000
NODE_ENV=development
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
OPENAI_LLM_MODEL=gpt-4o-mini
OPENAI_API_KEY=<api_key>
```

```bash
cd backend
npm install
```

### LLM Configuration

#### OpenAI
Create a `.env` file in `backend/`:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
```

---

### Document Ingestion

When running the backend at the beginning it will ingest the documents

```bash
npm start
```

---

### Run Backend

```bash
npm start
```

Backend runs on `http://localhost:3000`

---

## Frontend Setup (Angular)

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:4200`

---

## End-to-End Flow

1. Documents are pre-ingested and backend starts
2. User asks a question via Angular UI
3. NestJS performs semantic search
4. LLM generates an answer
5. Sources are returned to the UI

---

## Notes for Reviewers

- No low-code or auto-generated chatbot tools were used
- Vector store is pre-built and reused
- Clean separation of frontend and backend
- Source attribution is preserved end-to-end

---

## Possible Enhancements
- Streaming responses
- Page-level citations
- Dockerized deployment
- Authentication
