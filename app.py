from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
import scrape_glassdoor

app = Flask(__name__)
mongo = PyMongo(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/scrape")
def scraper():
    glass = mongo.db.glass
    glass_data = scrape_glassdoor.scrape()
    for job in glass_data:
        glass.insert(job)
    
    return redirect("http://localhost:5000/", code=302)

@app.route("/bell")
def bells():
    bellData = []
    entry = {}
    y = []
    companies = mongo.db.glass.distinct('company')
    for company in companies:
        qResult = mongo.db.glass.find_one({"company":company})
        y.append(qResult['salaryMIN'])
        y.append(qResult['salaryMED'])
        y.append(qResult['salaryMAX'])
        name = qResult['company']
        entry = {
            "y": y,
            "type":"box",
            "name":name
        }
        if entry["y"][0] != "":
            bellData.append(entry)
        y=[]
    return jsonify(bellData)


@app.route("/bubble")
def bubbles():
    companies = mongo.db.glass.distinct('company')
    data = []
    entry = {}
    for company in companies:
        job = mongo.db.glass.find_one({"company":company})
        median = job['salaryMED']
        rating = job['rating']
        rgba = 'rgba(%d,0,0)' % 255
        entry = {
            'x': [median],
            'y': [rating],
            'mode': 'markers',
            'type': 'scatter',
            'text': [job['company']],
            'markers':{
                'color': [rgba],
                'size': [rating*8],
                'symbol': ['circle'],
                'line': {
                    'color': 'rgba(0,0,0)',
                    'width' : 1
                }
            }
        }
        data.append(entry)
        entry={}
        
    return jsonify(data)


@app.route('/map')
def map():
    glass = mongo.db.glass.find()
    data = []
    entry = {}
    for job in glass:
        entry = {
            'title': job['title'],
            'company': job['company'],
            'city' : job['city'],
            'state': job['state'],
            'location': job['location'],
        }
        data.append(entry)
        entry={}
    print("Data created")

    geojson = {
    "type": "FeatureCollection",
    "features": [
    {
        "type": "Feature",
        "geometry" : {
            "type": "Point",
            "coordinates": [d["location"][1], d["location"][0]],
            },
        "properties" : d,
     } for d in data]
    }

    print("Returning GeoJson style data")
    return jsonify(geojson)

@app.route('/table')
def table():
    glass = mongo.db.glass.find()
    data = []
    entry = {}
    for job in glass:
        entry = {
            'title': job['title'],
            'company': job['company'],
            'city' : job['city'],
            'state': job['state'],
            'salary': job['salaryMED'],
            'stars': job['rating'],
            'time': job['duration']
        }
        data.append(entry)
        entry={}

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)