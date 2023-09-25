from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
from dotenv import load_dotenv
from config import config_by_name, FLASK_ENV
from datetime import timedelta
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

load_dotenv('.flaskenv')

app = Flask(__name__)
app.config.from_object(config_by_name[FLASK_ENV])
print(f"Running with config: {FLASK_ENV}")

cors_origins = app.config["CORS_ORIGINS"]
cors_supports_credentials = app.config["CORS_SUPPORTS_CREDENTIALS"]
CORS(app, origins=cors_origins, methods=["GET", "POST"], supports_credentials=cors_supports_credentials)

# General Config
app.secret_key = environ.get("SECRET_KEY")
flask_debug = app.config["FLASK_DEBUG"]
database_uri = app.config["SQLALCHEMY_DATABASE_URI"]
dev_server_host = app.config["DEV_SERVER_HOST"]
dev_server_port = app.config["DEV_SERVER_PORT"]
prod_server_host = app.config["PROD_SERVER_HOST"]
prod_server_port = app.config["PROD_SERVER_PORT"]
staging_server_host = app.config["STAGING_SERVER_HOST"]
staging_server_port = app.config["STAGING_SERVER_PORT"]
session_cookie_secure = app.config["SESSION_COOKIE_SECURE"]

db = SQLAlchemy(app)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["9000 per day", "5000 per hour"]
)

# Set expiration time for session data to clear if beforeunload fails
app.permanent_session_lifetime = timedelta(days=1)


# Define Tracker data table model
class TrackerData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(100), nullable=False)
    material_category = db.Column(db.String(100), nullable=False)
    product_name = db.Column(db.String(100), nullable=False)
    material_name = db.Column(db.String(100), nullable=False)
    manufacturer = db.Column(db.String(100), nullable=False)
    declared_unit = db.Column(db.String(100), nullable=False)
    value1 = db.Column(db.Float, nullable=False)
    unit1 = db.Column(db.String(100), nullable=False)
    value2 = db.Column(db.Float, nullable=False)
    unit2 = db.Column(db.String(100), nullable=False)
    mat_volume = db.Column(db.Float, nullable=False)
    a1to3 = db.Column(db.Float, nullable=False)
    a4 = db.Column(db.Float, nullable=False)
    a5 = db.Column(db.Float, nullable=False)
    b1 = db.Column(db.Float, nullable=False)
    b2 = db.Column(db.Float, nullable=False)
    b3 = db.Column(db.Float, nullable=False)
    b4 = db.Column(db.Float, nullable=False)
    b5 = db.Column(db.Float, nullable=False)
    b6 = db.Column(db.Float, nullable=False)

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