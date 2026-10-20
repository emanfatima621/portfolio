"""Flask API for Eman Fatima's portfolio. Run with: python app.py"""
import os, re, datetime
from functools import wraps
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from dotenv import load_dotenv
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

load_dotenv()
app = Flask(__name__)
app.config['MONGO_URI'] = os.getenv('MONGO_URI', 'mongodb://127.0.0.1:27017/eman_portfolio')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'change-this-development-secret-before-deploying')
app.config['DATABASE_NAME'] = os.getenv('DATABASE_NAME', 'eman_portfolio')
CORS(app, resources={r'/api/*': {'origins': os.getenv('FRONTEND_ORIGIN', 'http://localhost:5173')}})
mongo = PyMongo(app)
limiter = Limiter(get_remote_address, app=app, default_limits=[])
db = None

def database():
    # flask-pymongo uses the database in MONGO_URI, with DATABASE_NAME as fallback.
    global db
    if db is None:
        db = mongo.cx[app.config['DATABASE_NAME']]
    return db

def serialize(doc):
    if not doc: return doc
    doc = dict(doc)
    doc['id'] = str(doc.pop('_id'))
    for k, v in list(doc.items()):
        if isinstance(v, (datetime.datetime, datetime.date)): doc[k] = v.isoformat()
    return doc

def public_list(collection, query=None):
    return [serialize(x) for x in database()[collection].find(query or {}).sort('created_at', -1)]

def token_required(fn):
    @wraps(fn)
    def wrapped(*args, **kwargs):
        header = request.headers.get('Authorization', '')
        token = header[7:] if header.startswith('Bearer ') else ''
        if not token: return jsonify({'error': 'Missing Bearer token'}), 401
        try: payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except jwt.ExpiredSignatureError: return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError: return jsonify({'error': 'Invalid token'}), 401
        return fn(*args, **kwargs)
    return wrapped

def clean_text(value, max_len=3000):
    return value.strip()[:max_len] if isinstance(value, str) else ''

@app.get('/api/health')
def health():
    try:
        database().command('ping')
        return jsonify({'status':'ok','database':'connected','service':'Eman Portfolio API'})
    except Exception:
        return jsonify({'status':'ok','database':'disconnected','service':'Eman Portfolio API','hint':'Check that MongoDB is running and MONGO_URI is correct'}), 503

@app.get('/api/projects')
def projects(): return jsonify(public_list('projects', {'published': {'$ne': False}}))
@app.get('/api/experience')
def experience(): return jsonify(public_list('experience', {'published': {'$ne': False}}))
@app.get('/api/blog')
def blog(): return jsonify(public_list('blog', {'published': True}))
@app.get('/api/achievements')
def achievements(): return jsonify(public_list('achievements', {'published': {'$ne': False}}))

@app.post('/api/contacts')
@limiter.limit('5 per minute')
def contact():
    data = request.get_json(silent=True) or {}
    name, email, message = clean_text(data.get('name'), 100), clean_text(data.get('email'), 254), clean_text(data.get('message'), 4000)
    if not name or not email or not message: return jsonify({'error':'name, email, and message are required'}), 400
    if not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+', email): return jsonify({'error':'Please provide a valid email address'}), 400
    record = {'name':name, 'email':email, 'message':message, 'created_at':datetime.datetime.now(datetime.timezone.utc), 'status':'new'}
    result = database().contacts.insert_one(record)
    return jsonify({'message':'Thanks! Your message has been received.', 'id':str(result.inserted_id)}), 201

@app.post('/api/auth/login')
@limiter.limit('10 per minute')
def login():
    data = request.get_json(silent=True) or {}
    username, password = clean_text(data.get('username'), 100), data.get('password', '')
    admin = database().admins.find_one({'username':username})
    if not admin or not check_password_hash(admin.get('password_hash',''), password):
        return jsonify({'error':'Invalid username or password'}), 401
    token = jwt.encode({'sub':username,'exp':datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(hours=8)}, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({'access_token':token,'token_type':'Bearer','expires_in':28800})

@app.get('/api/admin/contacts')
@token_required
def admin_contacts(): return jsonify(public_list('contacts'))

@app.post('/api/admin/<collection>')
@token_required
def create_item(collection):
    if collection not in {'projects','experience','blog','achievements'}: return jsonify({'error':'Unsupported collection'}), 404
    data = request.get_json(silent=True) or {}
    if not clean_text(data.get('title') or data.get('company') or data.get('name')):
        return jsonify({'error':'Provide a title, company, or name'}), 400
    data['created_at'] = datetime.datetime.now(datetime.timezone.utc)
    data.setdefault('published', False)
    result = database()[collection].insert_one(data)
    return jsonify({'id':str(result.inserted_id),'message':'Item created'}), 201

@app.delete('/api/admin/<collection>/<item_id>')
@token_required
def delete_item(collection, item_id):
    if collection not in {'projects','experience','blog','achievements'}: return jsonify({'error':'Unsupported collection'}), 404
    try: oid = ObjectId(item_id)
    except Exception: return jsonify({'error':'Invalid item id'}), 400
    result = database()[collection].delete_one({'_id':oid})
    if not result.deleted_count: return jsonify({'error':'Item not found'}), 404
    return jsonify({'message':'Item deleted'})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.getenv('PORT','5000')), debug=os.getenv('FLASK_DEBUG','false').lower() == 'true')
