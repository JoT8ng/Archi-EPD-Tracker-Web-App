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
    material_name = db.Column(db.String(100))
    manufacturer = db.Column(db.String(100))
    declared_unit = db.Column(db.String(100))
    value1 = db.Column(db.Float)
    unit1 = db.Column(db.String(100))
    value2 = db.Column(db.Float)
    unit2 = db.Column(db.String(100))
    mat_volume = db.Column(db.Float)
    a1to3 = db.Column(db.Float)
    a4 = db.Column(db.Float)
    a5 = db.Column(db.Float)
    b1 = db.Column(db.Float)
    b2 = db.Column(db.Float)
    b3 = db.Column(db.Float)
    b4 = db.Column(db.Float)
    b5 = db.Column(db.Float)
    b6 = db.Column(db.Float)

    def __init__(
            self, session_id, 
            material_category, 
            product_name,
            material_name,
            manufacturer,
            declared_unit,
            value1,
            unit1,
            value2,
            unit2,
            mat_volume,
            a1to3,
            a4,
            a5,
            b1,
            b2,
            b3,
            b4,
            b5,
            b6
            ):
        self.session_id = session_id
        self.material_category = material_category
        self.product_name = product_name
        self.material_name = material_name
        self.manufacturer = manufacturer
        self.declared_unit = declared_unit
        self.value1 = value1
        self.unit1 = unit1
        self.value2 = value2
        self.unit2 = unit2
        self.mat_volume = mat_volume
        self.a1to3 = a1to3
        self.a4 = a4
        self.a5 = a5
        self.b1 = b1
        self.b2 = b2
        self.b3 = b3
        self.b4 = b4
        self.b5 = b5
        self.b6 = b6

@app.before_request
def before_request():
    session.permanent = True
    # Set expiration time for session data to clear if beforeunload fails
    app.permanent_session_lifetime = timedelta(days=1)

    # Generate a session id
    if "sid" not in session:
        # Generate a unique session id
        session["sid"] = str(uuid.uuid4())
