# `main.py` — Corrected Version for Your Current Stage


from fastapi import FastAPI, UploadFile, File, Form

from services.chunk_service import ChunkService
from services.pdf_service import PDFService
from services.embedding_service import EmbeddingService
from services.chroma_service import ChromaService


# --------------------------------------------------
# FastAPI Application
# --------------------------------------------------

app = FastAPI(
    title="DBATU Scholar Hub AI Service",
    description="AI service for PDF processing and RAG-based learning",
    version="1.0.0"
)


# --------------------------------------------------
# Initialize Services
# --------------------------------------------------

pdf_service = PDFService()

chunk_service = ChunkService()

embedding_service = EmbeddingService()

chroma_service = ChromaService()


# --------------------------------------------------
# Root Endpoint
# --------------------------------------------------

@app.get("/")
async def root():

    return {
        "message": "DBATU Scholar Hub AI Service is running"
    }


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.get("/health")
async def health():

    return {
        "status": "ok"
    }


# --------------------------------------------------
# PDF Upload / Testing Endpoint
# --------------------------------------------------

@app.get("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    text = pdf_service.extract_text(file)

    return {
        "characters": len(text),
        "preview": text[:500]
    }


# --------------------------------------------------
# INGEST PDF
# --------------------------------------------------

@app.post("/ingest")
async def ingest_pdf(
    file: UploadFile = File(...),
    user_id: str = Form(...),
    subject: str = Form(...)
):

    # ----------------------------------------------
    # 1. Extract text from PDF
    # ----------------------------------------------

    text = pdf_service.extract_text(file)


    # ----------------------------------------------
    # 2. Create chunks
    # ----------------------------------------------

    chunks = chunk_service.create_chunks(text)


    # ----------------------------------------------
    # 3. Extract text from chunks
    # ----------------------------------------------

    chunk_texts = [
        chunk["text"]
        for chunk in chunks
    ]


    # ----------------------------------------------
    # 4. Generate embeddings
    # ----------------------------------------------

    embeddings = embedding_service.create_embeddings(
        chunk_texts
    )


    # ----------------------------------------------
    # 5. Store everything in ChromaDB
    # ----------------------------------------------

    result = chroma_service.add_chunks(
        chunks=chunks,
        embeddings=embeddings,
        user_id=user_id,
        subject=subject,
        filename=file.filename
    )


    # ----------------------------------------------
    # 6. Return result
    # ----------------------------------------------

    return result


# --------------------------------------------------
# QUERY
# --------------------------------------------------

@app.post("/query")
async def query(
    question: str = Form(...),
    user_id: str = Form(...),
    subject: str = Form(...)
):

    # ----------------------------------------------
    # 1. Create embedding for the question
    # ----------------------------------------------

    query_embedding = embedding_service.create_embedding(
        question
    )


    # ----------------------------------------------
    # 2. Search ChromaDB
    # ----------------------------------------------

    results = chroma_service.search_chunks(
        query_embedding=query_embedding,
        user_id=user_id,
        subject=subject,
        top_k=5
    )


    # ----------------------------------------------
    # 3. Check whether documents were found
    # ----------------------------------------------

    if not results["documents"] or not results["documents"][0]:

        return {
            "question": question,
            "answer": "No relevant information found in your uploaded documents."
        }


    # ----------------------------------------------
    # 4. Extract retrieved documents
    # ----------------------------------------------

    documents = results["documents"][0]


    # ----------------------------------------------
    # 5. Create context
    # ----------------------------------------------

    context = "\n\n".join(documents)


    # ----------------------------------------------
    # 6. TEMPORARY RESPONSE
    # ----------------------------------------------
    #
    # PromptService and GroqService have not been
    # implemented yet.
    #
    # So for now, return the retrieved context.
    #

    return {
        "question": question,
        "retrieved_chunks": len(documents),
        "context": context
    }

