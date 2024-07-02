import unittest
import json
from app import app, db, TrackerData
from server import app
from config import config_by_name, FLASK_ENV

class ServerTestClass(unittest.TestCase):
    def setUp(self):
        app.config.from_object(config_by_name[FLASK_ENV])
        self.client = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()

        # Create all tables in the database
        with app.app_context():
            db.create_all()

    def tearDown(self):
        # Clean up the database after each test
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_tracker_get_route(self):
        response = self.client.get('/tracker?session_id=test_session')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)

    def test_tracker_post_route(self):
        response = self.client.post('/tracker', data={
            'session_id': 'test_session',
            'material_category': 'Test Category',
            'product_name': 'Test Product',
            'material_name': 'Test Material',
            'manufacturer': 'Test Manufacturer',
            'declared_unit': 'Test Unit',
            'value1': 1.0,
            'unit1': 'kg',
            'value2': 2.0,
            'unit2': 'g',
            'mat_volume': 3.0,
            'a1to3': 4.0,
            'a4': 5.0,
            'a5': 6.0,
            'b1': 7.0,
            'b2': 8.0,
            'b3': 9.0,
            'b4': 10.0,
            'b5': 11.0,
            'b6': 12.0
        })
        self.assertEqual(response.status_code, 200)

        session_data = TrackerData.query.filter_by(session_id='test_session').first()
        self.assertIsNotNone(session_data)

if __name__=='__main__':
	unittest.main()