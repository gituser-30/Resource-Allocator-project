from typing import List,Dict

class ChunkService:
    def __init__(self,chunk_size :int =400, overlap : int =50):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def create_chunks(self,text:str) ->list[Dict]:
        text = text.strip()

        if not text:
            return[]

        words = text.split()
        chunks = []

        start =0
        chunk_number =1

        while start < len(words):
            end = start + self.chunk_size

            current_chunk = words[start:end]
            chunk_text = " ".join(current_chunk)

            chunks.append({
                "chunk_number" : chunk_number,
                "text" : chunk_text,
                "word_count" : len(current_chunk)
            })

            start +=self.chunk_size - self.overlap
            chunk_number +=1
        return chunks