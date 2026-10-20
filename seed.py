"""Seed only verified project/experience facts; rerunnable without duplicates."""
import os, datetime
from dotenv import load_dotenv
from pymongo import MongoClient
from werkzeug.security import generate_password_hash
load_dotenv()
uri=os.getenv('MONGO_URI','mongodb://127.0.0.1:27017/eman_portfolio')
name=os.getenv('DATABASE_NAME','eman_portfolio')
db=MongoClient(uri, serverSelectionTimeoutMS=5000)[name]
projects=[
 {'title':'Hostel Management System','category':['Full Stack','Python'],'description':'A hostel management project for organising hostel, student, room and allocation records.','stack':['Python','Flask','MongoDB'],'github':'https://github.com/emanfatimaofficial24-669/Hostel-Management-System','published':True},
 {'title':'Food Ordering Website','category':['Frontend','JavaScript'],'description':'A web-based food ordering interface built with frontend technologies.','stack':['HTML','CSS','JavaScript'],'published':True},
 {'title':'Bloomify','category':['Web Development','AI/ML'],'description':'A flower-identification web project concept combining image upload and AI-supported information.','stack':['HTML','CSS','JavaScript','Python'],'published':True},
 {'title':'AI Chatbot Web Application','category':['Web Development','Python'],'description':'A Flask-based rule-driven chatbot web application.','stack':['Python','Flask','HTML','CSS'],'published':True},
 {'title':'Movie Recommendation Web App','category':['AI/ML','Web Development'],'description':'A Streamlit movie recommendation project.','stack':['Python','Streamlit'],'published':True},
 {'title':'Library Management System','category':['Programming'],'description':'A library management project written in C.','stack':['C'],'published':True},
 {'title':'AI Tic Tac Toe','category':['Python','AI'],'description':'A Python Tic Tac Toe game with AI gameplay logic.','stack':['Python'],'published':True},
]
experience=[
 {'company':'FlyRank AI','role':'AI Intern','type':'Remote Internship','start_date':'July 2026','end_date':'Present','focus':'General AI Fluency','published':True},
 {'company':'Decodelabs','role':'AI Intern','year':'2026','published':True},
]
for collection,items in [('projects',projects),('experience',experience)]:
 for item in items:
  key={'projects':{'title':item['title']},'experience':{'company':item['company']}}[collection]
  db[collection].update_one(key,{'$setOnInsert':{**item,'created_at':datetime.datetime.now(datetime.timezone.utc)}},upsert=True)
# No achievements or blog posts are seeded because no verified entries/articles were provided.
username=os.getenv('ADMIN_USERNAME','admin')
password=os.getenv('ADMIN_PASSWORD')
if password:
 db.admins.update_one({'username':username},{'$set':{'username':username,'password_hash':generate_password_hash(password)}},upsert=True)
 print(f'Admin account configured for username: {username}')
else:
 print('No admin account created. Set ADMIN_USERNAME and ADMIN_PASSWORD in backend/.env, then rerun seed.py.')
print('Seed complete. Projects and experience inserted without overwriting existing records.')
