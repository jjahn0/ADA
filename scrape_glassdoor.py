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
    browser = init_browser()
    url = "https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=true&clickSource=searchBtn&typedKeyword=data%20ana&sc.keyword=Data%20Analyst&locT=N&locId=1&jobType=&jl=2737939664"
    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, "html.parser")
    browser.quit()
    for item in soup.find("ul", class_="jlGrid hover"):
        for li in soup.find_all("li", class_="jl"):
            title = li.find("div", class_="flexbox").find('a').get_text()
            city = li.find("div", class_="flexbox empLoc").get_text().split(' – ')[1].split(', ')[0]
            state = li.find("div", class_="flexbox empLoc").get_text().split(' – ')[1].split(', ')[1][:2]
            company = li.find("div", class_="flexbox empLoc").get_text().split(' – ')[0][1:]
            info_class = li.find('i', class_='info infoSalEst margLtSm infoIcon _ok')
            rating = float(li.find("span", class_="compactStars").get_text())
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
                "location" : [lat, lng]
            }
            data_list.append(info)
            info = {}
    
    return data_list