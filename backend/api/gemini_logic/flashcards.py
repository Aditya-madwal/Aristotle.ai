import google.generativeai as genai
import typing_extensions as typing
import os
from dotenv import load_dotenv
import json
from typing import List, Dict
from datetime import datetime

class Flashcard(typing.TypedDict):
    heading: str
    points: List[str]

class FlashcardsSet(typing.TypedDict):
    topic: str
    overview: str
    flashcards: List[Flashcard]

class StudyFlashcardsGenerator:
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-pro-latest")

    def _generate_prompt(self, topic: str) -> str:
        """Generate prompt for Gemini API."""
        return f"""
        Create comprehensive study flashcards about {topic}.
        Format the response as a JSON object with this exact structure:
        {{
            "topic": "main topic name",
            "overview": "brief overview of the topic",
            "flashcards": [
                {{
                    "heading": "specific concept or subtopic",
                    "points": [
                        "detailed point 1",
                        "detailed point 2",
                        "detailed point 3",
                        "detailed point 4",
                        "detailed point 5"
                    ]
                }}
            ]
        }}

        Requirements:
        1. Generate at least 20 flashcards
        2. Each flashcard should have 5-6 detailed points
        3. Each heading should be unique and specific
        4. Points should be comprehensive yet concise
        5. Cover all important aspects of the topic
        6. Make points educational and clear
        7. Ensure content is factually accurate
        8. Use complete sentences for points
        """

    def generate_flashcards(self, topic: str) -> FlashcardsSet:
        try:
            # Generate prompt
            prompt = self._generate_prompt(topic)
            
            # Get response from Gemini
            result = self.model.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    temperature=0.7,
                    top_p=0.8,
                    top_k=40,
                    response_mime_type="application/json",
                )
            )
            
            # Parse and validate response
            flashcards_data = json.loads(result._result.candidates[0].content.parts[0].text)
            
            # Add metadata
            flashcards_data["metadata"] = {
                "generated_at": datetime.now().isoformat(),
                "version": "1.0"
            }
            
            return flashcards_data
            
        except Exception as e:
            raise Exception(f"Error generating flashcards: {str(e)}")

def generate_flashcards_for_topic(topic: str) -> Dict:
    """
    Generate flashcards for a given topic using the StudyFlashcardsGenerator.

    Args:
        topic (str): The topic for which to generate flashcards.

    Returns:
        dict: The generated flashcards JSON object.
    """
    load_dotenv()
    GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
    
    if not GOOGLE_API_KEY:
        raise ValueError("Please set GOOGLE_API_KEY in your .env file")
    
    generator = StudyFlashcardsGenerator(GOOGLE_API_KEY)
    
    try:
        # Generate flashcards
        flashcards = generator.generate_flashcards(topic)
        return flashcards
    except Exception as e:
        raise Exception(f"Error: {str(e)}")


