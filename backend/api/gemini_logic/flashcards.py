import google.generativeai as genai
import typing_extensions as typing
import os
from dotenv import load_dotenv
import json
from typing import List, Dict
from datetime import datetime

load_dotenv()


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
        self.model = genai.GenerativeModel(os.getenv('GOOGLE_GEMINI_MODEL'))

    def _generate_prompt(self, topic: str) -> str:
        """Generate prompt for Gemini API."""
        return f"""
        You are a flashcard generation assistant. Create comprehensive study flashcards about {topic}.
        You must respond with ONLY a JSON object in the following structure, without any additional text or markdown:

        {{
            "topic": "{topic}",
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

        IMPORTANT: Respond with only the JSON object, no additional text or formatting.
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
                    top_k=40
                )
            )

            # Clean and parse the response
            response_text = result.text.strip()

            # Remove any potential markdown code block markers
            response_text = response_text.replace(
                '```json', '').replace('```', '').strip()

            try:
                flashcards_data = json.loads(response_text)
            except json.JSONDecodeError as e:
                print(f"Raw response: {response_text}")  # For debugging
                raise Exception(f"Invalid JSON response: {str(e)}")

            # Add metadata
            flashcards_data["metadata"] = {
                "generated_at": datetime.now().isoformat(),
                "version": "1.0"
            }

            # Validate the structure
            if not all(key in flashcards_data for key in ["topic", "overview", "flashcards"]):
                raise Exception("Missing required fields in response")

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
