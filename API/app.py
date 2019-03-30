#!flask/bin/python
from flask import Flask
import json
import urllib.request


app = Flask(__name__)

# on load to home page, the api should load the top stories from the Reddit page:
@app.route('/news')
def index():
    contents = urllib.request.urlopen("https://www.reddit.com/r/worldnews/top/.json?count=25")

    data = json.loads(contents.read().decode("UTF-8"))

    text = [""]
    for i in range(len(data["data"]["children"])):
        text.append(data["data"]["children"][i]["data"]["title"])

    
    # print(text)
    print(data["data"]["children"][0]["data"])
    return str(text)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)
