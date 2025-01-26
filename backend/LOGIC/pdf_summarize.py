import os
import json
from dotenv import load_dotenv
from pathlib import Path
import google.generativeai as genai
import typing_extensions as typing
import PyPDF2

os.system('cls')
load_dotenv()

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

class PDFNotes(typing.TypedDict):
    topic: str
    topic_summary: str

class Overall(typing.TypedDict):
    overall_topic:str
    summary: str
    notes: list[PDFNotes]

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        pdf_file.seek(0, 2)  # 0 bytes from the end (2 = end of file)
        pdf_file_size = pdf_file.tell()  # get the file size in bytes
        file_size_kb = pdf_file_size / 1024
        print("=========================================")
        print(int(file_size_kb), "KB")
        print("=========================================")
        extracted_text = ""
        for page in pdf_reader.pages:
            text = page.extract_text()
            if text:
                extracted_text += text
        return extracted_text

try:
    model = genai.GenerativeModel("gemini-1.5-flash")
    sample_file_2 = extract_text_from_pdf('images/constitution_notes.pdf')
    # sample_pdf = genai.upload_file("images/constitution_notes.pdf")

    response = model.generate_content(["Give me a summary and overall topic of this pdf file and enlist the topics with their notes", sample_file_2], generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            response_schema=Overall
        ))
    # response = model.generate_content(
    #     ["Give me a summary of this pdf file and enlist the topics with their notes", sample_pdf],
    #     generation_config=genai.GenerationConfig(
    #         response_mime_type="application/json",
    #         response_schema=Overall
    #     )
    # )
    
    res = json.loads(response.text)
    print(res)
    # print(res.get("overall_topic", "topic not defined"))
    # print(res.get("summary", "No summary available"))
    # print("-----------")
    # for note in res.get("notes", []):
    #     print(note.get("topic", "No topic"))
    #     print(note.get("topic_summary", "No topic summary"))
    #     print(" ") 
except Exception as e:
    print(f"An error occurred: {e}")
