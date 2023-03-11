"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)

def set_password(password):
    return generate_password_hash(password)

def check_password(hash_password, password):
    return check_password_hash(hash_password, password)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    if request.method =='POST':
        body = request.json
        email = body.get('email', None)
        password = body.get('password', None)
        
        if email is None or password is None:
            return jsonify({'error': 'Password or email needed'}), 400
        else:
            login = User.query.filter_by(email=email).one_or_none()

            if login is None:
                return jsonify({'error': 'Bad credentials'}), 400
            else:
                if check_password(login.password, password):
                    access_token = create_access_token(identity=login.id)
                    return jsonify({ 'token': access_token, 'user_id': login.id }), 200

                else:
                    return jsonify({'error': 'Bad credentials'}), 400
                
@api.route('/sign_up', methods=['POST'])
def sign_up():
    if request.method =='POST':
        body = request.json
        email = body.get('email', None)
        password = body.get('password', None)

        form_data = [email, password]
        for item in form_data:
            if item is None:
                return jsonify({'message': "Form incomplete."}), 400
            else:
                password = generate_password_hash(password)

                user = User(email=email, password=password, is_active=True)

                db.session.add(user)
                try:
                    db.session.commit()
                    return jsonify({"message": "User created successfully"}), 201
                except Exception as error:
                    print(error.args)
                    db.session.rollback()
                    return  jsonify({"message": f"Error: {error.args}"}), 500