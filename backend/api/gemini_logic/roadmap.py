import google.generativeai as genai
import typing_extensions as typing
import os
from dotenv import load_dotenv
import json
from typing import Optional, List, Dict
from datetime import datetime

load_dotenv()
# os.system('cls')


class Resource(typing.TypedDict):
    type: str  # video/article/book/practice
    title: str
    url: str
    description: str
    estimated_time: str


class Project(typing.TypedDict):
    title: str
    description: str
    difficulty: str
    estimated_time: str


class Milestone(typing.TypedDict):
    title: str
    duration: str
    topics: List[str]
    resources: List[Resource]
    projects: List[Project]


class Roadmap(typing.TypedDict):
    subject: str
    duration: str
    difficulty: str
    prerequisites: List[str]
    milestones: List[Milestone]
    assessment_criteria: List[str]


class RoadmapGenerator:
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    def _generate_prompt(self, topic: str, duration: Optional[str] = None,
                         difficulty: Optional[str] = None) -> str:
        return f"""
        Create a detailed learning roadmap for {topic}
        {f'that spans {duration}' if duration else ''}
        {f'at {difficulty} level' if difficulty else ''}.

        The roadmap should be structured and include:
        - Prerequisites needed
        - Clear milestones with estimated duration
        - Specific topics for each milestone
        - High-quality learning resources (videos, articles, books, practices)
        - Hands-on projects
        - Assessment criteria

        Format the response as a JSON object with this exact structure:
        {{
            "subject": "{topic}",
            "duration": "total duration",
            "difficulty": "beginner/intermediate/advanced",
            "prerequisites": ["list of prerequisites"],
            "milestones": [
                {{
                    "title": "milestone title",
                    "duration": "estimated duration",
                    "topics": ["specific topics to cover"],
                    "resources": [
                        {{
                            "type": "video/article/book/practice",
                            "title": "resource title",
                            "url": "resource url",
                            "description": "brief description",
                            "estimated_time": "time to complete"
                        }}
                    ],
                    "projects": [
                        {{
                            "title": "project title",
                            "description": "project description",
                            "difficulty": "beginner/intermediate/advanced",
                            "estimated_time": "estimated completion time"
                        }}
                    ]
                }}
            ],
            "assessment_criteria": ["list of criteria to evaluate progress"]
        }}

        Ensure all URLs are real and resources are high-quality. Include a mix of free and paid resources.
        """

    def generate_roadmap(self,
                         topic: str,
                         duration: Optional[str] = None,
                         difficulty: Optional[str] = None) -> Roadmap:
        """
        Generate a structured learning roadmap using Gemini API.

        Args:
            topic: Subject to learn
            duration: Optional total duration (e.g., "3 months")
            difficulty: Optional difficulty level

        Returns:
            Structured roadmap dictionary
        """
        try:
            prompt = self._generate_prompt(topic, duration, difficulty)

            result = self.model.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    temperature=0.7,
                    top_p=0.8,
                    top_k=40,
                    response_mime_type="application/json",
                )
            )

            # Extract and parse JSON response
            roadmap_json = result._result.candidates[0].content.parts[0].text
            roadmap_data = json.loads(roadmap_json)

            # Validate the structure
            self._validate_roadmap(roadmap_data)

            # Add metadata
            roadmap_data["generated_at"] = datetime.now().isoformat()
            roadmap_data["version"] = "1.0"

            return roadmap_data

        except Exception as e:
            raise Exception(f"Error generating roadmap: {str(e)}")

    def _validate_roadmap(self, roadmap: Dict) -> None:
        """Validate the structure of the generated roadmap."""
        required_keys = ['subject', 'duration',
                         'prerequisites', 'milestones', 'assessment_criteria']

        if not all(key in roadmap for key in required_keys):
            raise ValueError(
                f"Missing required keys in roadmap. Required: {required_keys}")

        if not isinstance(roadmap['milestones'], list):
            raise ValueError("Milestones must be a list")

        for milestone in roadmap['milestones']:
            if not all(key in milestone for key in ['title', 'duration', 'topics', 'resources', 'projects']):
                raise ValueError(f"Invalid milestone structure: {milestone}")


def save_roadmap(roadmap: Dict, filename: str) -> None:
    """Save the roadmap to a JSON file."""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(roadmap, f, indent=2, ensure_ascii=False)


def generate_roadmap_data(topic, duration, difficulty):
    GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
    generator = RoadmapGenerator(GOOGLE_API_KEY)
    roadmap = generator.generate_roadmap(
        topic=topic,
        duration=duration,
        difficulty=difficulty
    )
    return roadmap


# print(generate_roadmap_data("react js", "3 months", "beginner"))


# Example usage
# if __name__ == "__main__":
#     GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

#     # Create generator instance
#     generator = RoadmapGenerator(GOOGLE_API_KEY)

#     # Generate roadmap
#     topic = "Backend Development"
#     try:
#         roadmap = generator.generate_roadmap(
#             topic=topic,
#             duration="3 months",
#             difficulty="beginner"
#         )

#         # Save to file
#         filename = f"{topic.lower().replace('/', '_')}_roadmap.json"
#         save_roadmap(roadmap, filename)

#         print(f"\nRoadmap generated and saved to {filename}")
#         print("\nRoadmap Overview:")
#         print(f"Subject: {roadmap['subject']}")
#         print(f"Duration: {roadmap['duration']}")
#         print(f"Number of milestones: {len(roadmap['milestones'])}")
#         print("\nMilestones:")
#         for milestone in roadmap['milestones']:
#             print(f"- {milestone['title']} ({milestone['duration']})")

#     except Exception as e:
#         print(f"Error: {str(e)}")
