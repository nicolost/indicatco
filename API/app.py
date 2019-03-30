#!flask/bin/python
from flask import Flask, jsonify
import json
import urllib.request
from newspaper import Article
from bs4 import BeautifulSoup

app = Flask(__name__)

# on load to home page, the api should load the top stories from the Reddit page:
@app.route('/news')
def index():
    contents = urllib.request.urlopen("https://www.reddit.com/r/worldnews/top/.json?count=25")

    data = json.loads(contents.read().decode("UTF-8"))

    processed_data = []
    for i in range(len(data["data"]["children"])):
        url = data["data"]["children"][i]["data"]["url"]
        
        processed_data.append({
            'title': data["data"]["children"][i]["data"]["title"],
            'url': data["data"]["children"][i]["data"]["url"],
            'permalink': data["data"]["children"][i]["data"]["permalink"]
        })
    
    # get image
    imgs = []
    for d in processed_data:
        article = Article(d['url'])
        article.download()
        soup = BeautifulSoup(article.html, 'html.parser')
        img_link = soup.find("meta", property="og:image")
        imgs.append(img_link['content'])
    
    return jsonify({ 'titles': processed_data, 'imgs': imgs }) 

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)
