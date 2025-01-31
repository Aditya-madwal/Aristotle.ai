import google.generativeai as genai
import typing_extensions as typing
import os
from dotenv import load_dotenv
import json
from typing import Optional, List, Dict
from datetime import datetime
from pdfminer.high_level import extract_text
from io import BytesIO


class Section(typing.TypedDict):
    title: str
    summary: str
    key_points: List[str]
    examples: List[str]


class Notes(typing.TypedDict):
    title: str
    overview: str
    sections: List[Section]
    key_terms: Dict[str, str]
    summary: str
    review_questions: List[str]


class PDFNotesGenerator:
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(os.getenv('GOOGLE_GEMINI_MODEL'))

    # def extract_text_from_pdf(self, pdf_path: str) -> str:
    #     """Extract text content from PDF file."""
    #     try:
    #         if not os.path.exists(pdf_path):
    #             raise FileNotFoundError(f"PDF file not found at path: {pdf_path}")

    #         text = extract_text(pdf_path)
    #         return text.strip()
    #     except Exception as e:
    #         raise Exception(f"Error extracting text from PDF: {str(e)}")

    def extract_text_from_pdf(self, uploaded_file) -> str:
        """
        Extract text content from an uploaded PDF file.

        Args:
            uploaded_file: The file object from request.FILES.

        Returns:
            str: The extracted text from the PDF.
        """
        try:
            if not uploaded_file:
                raise ValueError("No file provided.")

            # Read file content into a BytesIO buffer
            file_buffer = BytesIO(uploaded_file.read())

            # Extract text from PDF
            text = extract_text(file_buffer)
            return text.strip()
        except Exception as e:
            raise Exception(f"Error extracting text from PDF: {str(e)}")

    def _generate_prompt(self, text: str) -> str:
        """Generate prompt for Gemini API."""
        return f"""
        Analyze the following text and create detailed study notes.
        Format the response as a JSON object with this exact structure:
        {{
            "title": "document title",
            "overview": "brief overview of the entire text",
            "sections": [
                {{
                    "title": "section title",
                    "summary": "section summary",
                    "key_points": [
                        "key point 1",
                        "key point 2"
                    ],
                    "details": [
                        "detail 1",
                        "detail 2"
                    ]
                }}
            ],
            "key_terms": {{
                "term1": "definition1",
                "term2": "definition2"
            }},
            "summary": "comprehensive summary of main points",
            "review_questions": [
                "question 1",
                "question 2"
            ]
        }}

        Text to analyze:
        {text}

        Create comprehensive yet concise notes. Include relevant examples where possible.
        Generate thought-provoking review questions that test understanding.
        Identify and define important terminology in the key_terms section.

        ### Output Format:
        Ensure the response is a **valid JSON object** with proper escaping for special characters.
        Wrap any **quotes inside strings with `\\` (backslashes)** to prevent JSON errors.
        If a section has no data, return an empty string `""`, not `null` or missing fields.
        """

    def generate_notes(self,
                       pdf_file: str,
                       max_length: Optional[int] = None) -> Notes:
        """
        Generate structured notes from a PDF file.

        Args:
            pdf_path: Path to the PDF file
            max_length: Optional maximum length of text to process

        Returns:
            Structured notes dictionary
        """
        try:
            # Extract text from PDF
            text = self.extract_text_from_pdf(pdf_file)

            # Truncate text if max_length is specified
            if max_length and len(text) > max_length:
                text = text[:max_length]

            # Generate prompt
            prompt = self._generate_prompt(text)

            # Get response from Gemini
            result = self.model.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    temperature=0.3,
                    top_p=0.8,
                    top_k=40,
                    response_mime_type="application/json",
                )
            )

            # Parse and validate response
            notes_data = json.loads(
                result._result.candidates[0].content.parts[0].text)

            # Add metadata
            notes_data["metadata"] = {
                "generated_at": datetime.now().isoformat(),
                "version": "1.0"
            }

            return notes_data

        except Exception as e:
            raise Exception(f"Error generating notes: {str(e)}")


def save_notes(notes: Dict, filename: str) -> None:
    """Save the generated notes to a JSON file."""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(notes, f, indent=2, ensure_ascii=False)

# Example usage
# if __name__ == "__main__":
#     load_dotenv()
#     GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

#     # Create generator instance
#     generator = PDFNotesGenerator(GOOGLE_API_KEY)

#     # File paths
#     pdf_path = "images/constitution_notes.pdf"  # Replace with your PDF path
#     output_path = "notes.json"

#     try:
#         # Generate notes
#         notes = generator.generate_notes(pdf_path)

#         # Save to file
#         save_notes(notes, output_path)

#         # Print overview
#         print("\nNotes Generated Successfully!")
#         print(f"Title: {notes['title']}")
#         print(f"Number of sections: {len(notes['sections'])}")
#         print(f"Number of key terms: {len(notes['key_terms'])}")
#         print(f"Number of review questions: {len(notes['review_questions'])}")
#         print(f"\nNotes saved to: {output_path}")

#         # Print sample section
#         print("\nSample Section:")
#         first_section = notes['sections'][0]
#         print(f"Title: {first_section['title']}")
#         print(f"Summary: {first_section['summary']}")
#         print("\nKey Points:")
#         for point in first_section['key_points'][:3]:
#             print(f"- {point}")

#     except Exception as e:
#         print(f"Error: {str(e)}")
