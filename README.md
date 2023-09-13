# Archi-EPD-Tracker-Web-App

_Last update 13/09/2023_

**EPD****ata****.** is a work in progress free web tool that allows architects and other construction professionals to track and visualize embodied carbon emissions of various construction material options.


## Current Features:
* Input EPD product information to create database of project EPDs
* View database of project EPDs as a table
* Create graphs comparing GWP of different stages of EPD products
* Create graphs comparing GWP (all-stages/select stages) of EPD products

## Features To Be Added:
* Sort database by material category
* Edit database
* Download database in excel/csv format
* Download graphs in pdf format
* More graph data options
* More graph types
* Revit integration capability


## This web app uses:
* Flask framework
* React framework
* React Chart JS
* React Tables
* SQLAlchemy
* Postgresql


## Dependencies:
* Install requirements.txt for Flask backend (Python version 3.11)
	```
	pip install -r requirements.txt
	```
* Install package.json for React frontend (Version of npm ?)
	```
	npm install
	```


## Getting Started:
Set up config files for both the frontend and backend for development, staging, and production.
To start backend in development mode:
```
flask run
```
To start frontend in development mode:
```
npm run start
```

Create Python Virtual Environment:
Windows Powershell Terminal:
```
python -m venv myenv
```

Initialize Flask SQLAlchemy Database:
Windows Powershell Terminal:
```
py 
```
```
from app import app, db, TrackerData
	with app.app_context():
		db.create_all()
```
```
exit()
```

Create PostgreSQL Database:


Update requirements.txt:
pip freeze > requirements.txt
