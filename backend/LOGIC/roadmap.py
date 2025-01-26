import google.generativeai as genai
import typing_extensions as typing
import os
from dotenv import load_dotenv
import json
os.system('cls')
load_dotenv()

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

genai.configure(api_key=GOOGLE_API_KEY)

class roadmap_step(typing.TypedDict):
    step_title: str
    step_links: list[str]

class recipe(typing.TypedDict) :
    recipe_name : str
    ingredients : list[str]

topic = input("which topic do you wanna study")


model = genai.GenerativeModel("gemini-1.5-pro-latest")
# RECIPE = {"recipe_name":str,"ingrdients":list[str]}
result = model.generate_content(
    # "give me 5 easy snack recipe for evening",
    f"generate a roadmap of to learn {topic} and also include links of resources with each step",
    generation_config=genai.GenerationConfig(
        response_mime_type="application/json", response_schema=list[roadmap_step]
    ),
)

res = result._result.candidates[0].content.parts[0].text

for i in json.loads(res) :
    print(i["step_title"])
    if i["step_links"] :
        for j in i["step_links"] :
            print("-->"+ j)
        # print(i["step_links"])
    print("-------------------")