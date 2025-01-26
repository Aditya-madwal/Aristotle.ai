from dotenv import load_dotenv
load_dotenv()

from flashcards import generate_flashcards_for_topic

print(generate_flashcards_for_topic("user personas"))