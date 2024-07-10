"""
EPData backend Flask application helper functions.
"""

from flask import request
from app import TrackerData

def extract_form_data():
    session_id = request.form.get("session_id")
    material_category = request.form.get("material_category", default="None")
    product_name = request.form.get("product_name", default="None")
    material_name = request.form.get("material_name", default="None")
    manufacturer = request.form.get("manufacturer", default="None")
    declared_unit = request.form.get("declared_unit", default="None")
    value1 = request.form.get("value1", default=0.0)
    unit1 = request.form.get("unit1", default="None")
    value2 = request.form.get("value2", default=0.0)
    unit2 = request.form.get("unit2", default="None")
    mat_volume = request.form.get("mat_volume", default=0.0)
    a1to3 = request.form.get("a1to3", default=0.0)
    a4 = request.form.get("a4", default=0.0)
    a5 = request.form.get("a5", default=0.0)
    b1 = request.form.get("b1", default=0.0)
    b2 = request.form.get("b2", default=0.0)
    b3 = request.form.get("b3", default=0.0)
    b4 = request.form.get("b4", default=0.0)
    b5 = request.form.get("b5", default=0.0)
    b6 = request.form.get("b6", default=0.0)
    print(request.form)

    tracker_data = TrackerData(
            session_id=session_id,
            material_category=material_category,
            product_name=product_name,
            material_name=material_name,
            manufacturer=manufacturer,
            declared_unit=declared_unit,
            value1=value1,
            unit1=unit1,
            value2=value2,
            unit2=unit2,
            mat_volume=mat_volume,
            a1to3=a1to3,
            a4=a4,
            a5=a5,
            b1=b1,
            b2=b2,
            b3=b3,
            b4=b4,
            b5=b5,
            b6=b6
            )

    return tracker_data

def to_dict(data):
    return {
        "id": data.id,
        "material_category": data.material_category,
        "product_name": data.product_name,
        "material_name": data.material_name,
        "manufacturer": data.manufacturer,
        "declared_unit": data.declared_unit,
        "value1": data.value1,
        "unit1": data.unit1,
        "value2": data.value2,
        "unit2": data.unit2,
        "mat_volume": data.mat_volume,
        "a1to3": data.a1to3,
        "a4": data.a4,
        "a5": data.a5,
        "b1": data.b1,
        "b2": data.b2,
        "b3": data.b3,
        "b4": data.b4,
        "b5": data.b5,
        "b6": data.b6
    }

def query_row_to_delete(data):
    return TrackerData.query.filter_by(
        material_category=data["material_category"],
        product_name=data["product_name"],
        material_name=data["material_name"],
        manufacturer=data["manufacturer"],
        declared_unit=data["declared_unit"],
        value1=data["value1"],
        unit1=data["unit1"],
        value2=data["value2"],
        unit2=data["unit2"],
        mat_volume=data["mat_volume"],
        a1to3=data["a1to3"],
        a4=data["a4"],
        a5=data["a5"],
        b1=data["b1"],
        b2=data["b2"],
        b3=data["b3"],
        b4=data["b4"],
        b5=data["b5"],
        b6=data["b6"]
    ).first()
