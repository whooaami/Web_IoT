from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from os import abort

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///car.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    color = db.Column(db.String(20))
    weight = db.Column(db.Integer)
    price = db.Column(db.Integer)

    def __init__(self, name, color, weight, price):
        self.name = name
        self.color = color
        self.weight = weight
        self.price = price


class CarsSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'color', 'weight', 'price')


car_schema = CarsSchema()
cars_schema = CarsSchema(many=True)


@app.route('/')
@cross_origin()
def index():
    return render_template('index.html')


@app.route("/cars", methods=["GET"])
@cross_origin()
def get_cars():
    cars = Car.query.all()
    result = cars_schema.dump(cars)
    return jsonify(result)


@app.route("/cars/<id>", methods=["GET"])
@cross_origin()
def get_car(id):
    car = Car.query.get(id)
    if car is None:
        abort(404)
    return car_schema.jsonify(car)


@app.route("/cars", methods=["POST"])
@cross_origin()
def add_car():
    data = CarsSchema().load(request.json)
    new_car = Car(**data)

    db.session.add(new_car)
    db.session.commit()

    return car_schema.jsonify(new_car)


@app.route("/cars/<id>", methods=["PUT"])
@cross_origin()
def update_car(id):
    car = Car.query.get(id)

    if car is None:
        abort(404)

    data = CarsSchema().load(request.json)

    for i in data:
        setattr(car, i, request.json[i])

    db.session.commit()
    return car_schema.jsonify(car)


@app.route("/cars/<id>", methods=["DELETE"])
@cross_origin()
def delete_car(id):
    car = Car.query.get(id)
    if car is None:
        abort(404)
    db.session.delete(car)
    db.session.commit()
    return car_schema.jsonify(car)


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
