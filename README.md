# Aristotle.ai

Aristotle.ai is a **student productivity management app** built with **React.js** and **Django**, leveraging **Gemini AI** for intelligent content generation. It is designed to help students organize their study plans, track progress, and interact with AI for PDF summarization and chat functionality.

## Features

✅ **Roadmap Generation & Tracking** - Create, customize, and track study roadmaps.  
✅ **Schedule Tracking** - Manage study schedules with reminders and deadlines.  
✅ **AI-powered PDF Summarization & Chat** - Upload PDFs, get AI-generated summaries, and chat with the document.  
✅ **Multiple Roadmap & Study Area Management** - Organize studies into different subjects or areas.  
✅ **To-Do List with Labels** - Efficient task management with labeled categorization.  

## Tech Stack

- **Frontend:** React.js  
- **Backend:** Django & Django REST Framework  
- **AI Integration:** Gemini AI  
- **Database:** PostgreSQL  
- **Authentication:** JWT-based authentication  

## Installation

### Prerequisites
Ensure you have the following installed:  
- Node.js & npm  
- Python & pip  
- PostgreSQL  

### Backend Setup (Django)
```bash
git clone https://github.com/yourusername/aristotle-ai.git
cd aristotle-ai/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # For Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

### Frontend Setup (React)
```bash
cd ../frontend

# Install dependencies
npm install

# Start React app
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/roadmaps/` | Fetch all roadmaps |
| POST | `/api/roadmaps/` | Create a new roadmap |
| GET | `/api/todos/` | Fetch all to-do tasks |
| POST | `/api/todos/` | Add a new task |
| POST | `/api/upload-pdf/` | Upload a PDF for AI processing |
| GET | `/api/chat-pdf/{id}/` | Chat with a specific PDF |
