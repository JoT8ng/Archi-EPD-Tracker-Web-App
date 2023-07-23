from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
import uuid
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv('.flaskenv')

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", default=os.urandom(32))
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tracker.db"
db = SQLAlchemy(app)

# Define Tracker data table model
class TrackerData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(100))
    material_category = db.Column(db.String(100))
    product_name = db.Column(db.String(100))

    def __init__(self, session_id, material_category, product_name):
        self.session_id = session_id
        self.material_category = material_category
        self.product_name = product_name

@app.before_request
def before_request():
    session.permanent = True
    # Set expiration time for session data to clear if beforeunload fails
    app.permanent_session_lifetime = timedelta(days=1)

    # Generate a session id
    if 'sid' not in session:
        # Generate a unique session id
        session['sid'] = str(uuid.uuid4())
