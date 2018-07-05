from flask import Flask, render_template, jsonify, redirect, request
from flask_pymongo import PyMongo
import pandas as pd
import json
import sys
from bson import BSON
from bson import json_util
import scrape_glassdoor

app = Flask(__name__)
mongo = PyMongo(app)

@app.route("/", methods=["GET", "POST"])
def index():
    key = request.args.get('key')
    value = request.args.get('value')
    if key == 'salaryMED':
        value = int(value)
    elif key == 'location':
        value = [float(value[0]), float(value[1])]
    value = request.args.get('value')
    query = {
        "key" : key,
        "value" : value
    }
    glass = mongo.db.glass.find( { key:value } )
    if glass == []:
        query = None
    return render_template("index.html", query=query)

@app.route("/api/scrape")
def scraper():
    glass = mongo.db.glass
    # glass_data = scrape_glassdoor.scrape()
    with open('Resources/glass2018-07-03.json', 'r') as infile:
        glass_data = json.load(infile)
        for job in glass_data:
            glass.insert(job)
    
    return redirect("http://localhost:5000/", code=302)

@app.route("/api/query", methods=["GET", "POST"])
def query():
    key = request.args.get('key')
    value = request.args.get('value')
    if key == 'salaryMIN' or key == 'salaryMED' or key == 'salaryMAX':
        value = int(value)
    elif key == 'lat':
        value = float(value)
    elif key == 'lng':
        value = float(value)
    elif key == 'rating':
        value = float(value)
    if key != None and value != None:
        glass = mongo.db.glass.find( { key:value } )
    else:
        glass = mongo.db.glass.find()
    if glass == None:
        glass = mongo.db.glass.find()
    data =[]
    entry={}
    for job in glass:
        entry = {
            'title': job['title'],
            'company': job['company'],
            'city' : job['city'],
            'state': job['state'],
            'salaryMIN': job['salaryMIN'],
            'salaryMED': job['salaryMED'],
            'salaryMAX': job['salaryMAX'],
            'rating': job['rating'],
            'duration': job['duration'],
            'lat': job['lat'],
            'lng': job['lng']
        }
        data.append(entry)
        entry={}
    return jsonify(data)

@app.route("/process")
def process():
    return render_template("process.html")

@app.route("/summary")
def summary():
    return render_template("summary.html")

@app.route("/bellchart")
def bellchart():
    return render_template("bell.html")

@app.route("/bubbleplot")
def bubbleplot():
    return render_template("bubble.html")
 
@app.route("/geomap")
def geomap():
    return render_template("map.html")

@app.route("/datatable")
def datatable():
    return render_template("datatable.html")

if __name__ == "__main__":
    app.run(debug=True)