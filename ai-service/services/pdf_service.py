from pypdf import PdfReader
from fastapi import UploadFile

class PDFService:
    def extract_text(self,file:UploadFile):
        reader = PdfReader(file.file)
        text =""
        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text +=page_text + '\n'

        return text