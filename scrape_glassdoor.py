import time
from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
from selenium import webdriver
import os

def init_browser():
    executable_path = {'executable_path': 'chromedriver'}
    return Browser('chrome', **executable_path)

info = {}
data_list = []
file = os.path.join("Resources", "uscitiesv1.4.csv")
citiesDF = pd.read_csv(file)

def scrape():
    
    info = {}
    data_list = []
    file = os.path.join("Resources", "uscitiesv1.4.csv")
    citiesDF = pd.read_csv(file)

    url_list = ["https://www.glassdoor.com/Job/us-data-analyst-jobs-SRCH_IL.0,2_IN1_KO3,15.htm"]
    for i in range(2,31):
        url_string = "https://www.glassdoor.com/Job/us-data-analyst-jobs-SRCH_IL.0,2_IN1_KO3,15_IP%d.htm" % i
        url_list.append(url_string)

    for glassURL in url_list:
        browser = init_browser()
        url = glassURL
        browser.visit(url)
        html = browser.html
        soup = BeautifulSoup(html, "html.parser")
        browser.quit()
       
        for item in soup.find("ul", class_="jlGrid hover"):
            for li in soup.find_all("li", class_="jl"):
                a = li.find("div", class_="flexbox").find('a')
                if a == None:
                    title = ''
                else:
                    title = a.get_text()
                    
                city_state = li.find("div", class_="flexbox empLoc").get_text()
                if city_state == '':
                    city = ''
                    state = ''
                elif len(city_state.split(' – ')[-1].split(', ')) < 2:
                    print(city_state.split(' – ')[-1].split(', ')[0][:13])
                    city = ''
                    state = ''
                else:
                    city = city_state.split(' – ')[-1].split(', ')[0]
                    state = city_state.split(' – ')[-1].split(', ')[1][:2]
                    
                flex = li.find("div", class_="flexbox empLoc").get_text()
                if flex == '':
                    company = ''
                else:
                    company = flex.split(' – ')[0][1:]
                
                info_class = li.find('i', class_='info infoSalEst margLtSm infoIcon _ok')
                
                stars = li.find("span", class_="compactStars")
                if stars == None:
                    rating = ''
                else:
                    rating = float(stars.get_text())
                
                duration = li.findAll("div", class_=False)[-1].get_text().split(' ')[-1]
                if info_class != None:
                    max_salary = int(li.find('i', class_="info infoSalEst margLtSm infoIcon _ok")['data-displayed-max-salary'])
                    med_salary = int(li.find('i', class_="info infoSalEst margLtSm infoIcon _ok")['data-displayed-med-salary'])
                    min_salary = int(li.find('i', class_="info infoSalEst margLtSm infoIcon _ok")['data-displayed-min-salary'])
                else:
                    max_salary = ''
                    med_salary = ''
                    min_salary = ''

                loc = citiesDF.loc[(citiesDF['city'] ==  city) & (citiesDF['state_id'] == state)]
                if loc.empty:
                    lat = ''
                    lng = ''
                else: 
                    lat = float(loc['lat'])
                    lng = float(loc['lng'])

                info = {
                    "title" : title,
                    "city" : city,
                    "state" : state,
                    "company" : company,
                    "rating" : rating,
                    "salaryMAX" : max_salary,
                    "salaryMED" : med_salary,
                    "salaryMIN" : min_salary,
                    "duration" : duration,
                    "lat" : lat,
                    "lng" : lng
                }
                data_list.append(info)
                info = {}
    
    return data_list