import chromadb
from typing import List, Dict

class ChromaService:
    def __init__(self):
        self.client = chromadb.PersistentClient(
            path ="chroma_store"
        )

        self.collection = self.client.get_or_create_collection(
            name ="student_notes"
        )

    def add_chunks(
            self,
            chunks:list[Dict],
            embeddings:list[list[float]],
            user_id:str,
            subject:str,
            filename:str
    ):
        ids =[]
        documents =[]
        metadatas = []

        for chunk, embedding in zip(chunks, embeddings):

            chunk_id = (
                f"{user_id}_"
                f"{filename}_"
                f"{chunk['chunk_number']}"
            )

            ids.append(chunk_id)

            documents.append(chunk["text"])

            metadatas.append(
                {
                    "user_id": user_id,
                    "subject": subject,
                    "filename": filename,
                    "chunk_number": chunk["chunk_number"],
                    "word_count": chunk["word_count"],
                }
            )

        self.collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas,
        )

        return {
            "message": "Document indexed successfully",
            "chunks_added": len(chunks),
        }

    # -----------------------------------------
    # Search similar chunks
    # -----------------------------------------
    def search_chunks(
        self,
        query_embedding: List[float],
        user_id: str,
        subject: str,
        top_k: int = 5,
    ):

        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            where={
                "$and": [
                    {"user_id": user_id},
                    {"subject": subject},
                ]
            },
        )

        return results

    # -----------------------------------------
    # Delete all chunks of one document
    # -----------------------------------------
    def delete_document(
        self,
        user_id: str,
        filename: str,
    ):

        self.collection.delete(
            where={
                "$and": [
                    {"user_id": user_id},
                    {"filename": filename},
                ]
            }
        )

        return {
            "message": "Document deleted successfully"
        }

    # -----------------------------------------
    # Get all documents uploaded by a user
    # -----------------------------------------
    def get_user_documents(self, user_id: str):

        results = self.collection.get(
            where={
                "user_id": user_id
            }
        )

        return results

    # -----------------------------------------
    # Count total chunks
    # -----------------------------------------
    def count_chunks(self):

        return self.collection.count()