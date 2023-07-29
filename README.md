# Archi-EPD-Tracker-Web-App

The Archi EPD Tracker is a work in progress free web tool that allows architects and other construction professionals to track and visualize embodied carbon emissions of various construction material options.

Current Features:
1. Input EPD product information to create database of project EPDs
2. View database of project EPDs
3. Sort database by material category
5. Create graphs comparing GWP of different stages of EPD products
6. Create graphs comparing GWP (all-stages/select stages) of EPD products of each material category

New Features To Be Added:
1. Download database in excel/csv format
2. Download graphs in pdf format
3. More graph data options
4. More graph types
4. Revit integration capability

This web app uses a Flask framework as the backend and a React framework as the frontend.
This web app uses d3.js.......


Dependencies:
REMINDER: write version of npm needed
Python version 3.11

All dependences needed for backend virtual environment saved in requirements.txt
For windows:
'py -m venv env'
'pip install -r requirements.txt'
'code .flaskenv'

Getting Started:
Temp text

Initialize Flask SQLAlchemy Database:
py
from app import app, db, TrackerData
with app.app_context():
    db.create_all()
exit()

When launching:
Launching backend and frontend
'npm run start-all'
Launching frontend
'npm run start-react'
Launching backend
'flask run'
From local computer VS Code
'"cd ../backend && env/Scripts/flask run --no-debugger"'
From Github Codespace
'"cd /workspaces/Archi-EPD-Tracker-Web-App/backend && venv/bin/flask run --no-debugger"'

Learn More:
Temp Text

Deploy on Vercel:
Temp Text