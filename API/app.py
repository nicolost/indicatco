#!flask/bin/python
from flask import Flask, jsonify
import json
import urllib.request
from newspaper import Article
from bs4 import BeautifulSoup
import pickle
from flask_cors import CORS
from keras.models import model_from_json
from keras.preprocessing import sequence
from keras import backend as K

app = Flask(__name__)
CORS(app)

# get word index from pickle
pickle_in = open("word_index.pickle","rb")
word_index = pickle.load(pickle_in)

# load model
json_file = open('model2.json', 'r')
loaded_model_json = json_file.read()
json_file.close()

loaded_model = model_from_json(loaded_model_json)
loaded_model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
print("Loaded model from disk")


# on load to home page, the api should load the top stories from the Reddit page:
@app.route('/news')
def index():

    def vectorise_text_data(data, word_index):
        vectorised_data = []
        for row in data:
            current_row = []
            for word in row.split():
                word = word.lower()
                if word not in word_index:
                    current_row.append(word_index["<UNUSED>"])
                else:
                    current_row.append(word_index[word])
            vectorised_data.append(current_row)
        return vectorised_data

    contents = urllib.request.urlopen("https://www.reddit.com/r/worldnews/top/.json?count=25")

    data = json.loads(contents.read().decode("UTF-8"))

    processed_data = []
    titles = []
    for i in range(len(data["data"]["children"])):
        url = data["data"]["children"][i]["data"]["url"]
        titles.append(data["data"]["children"][i]["data"]["title"])
        processed_data.append({
            'title': data["data"]["children"][i]["data"]["title"],
            'url': data["data"]["children"][i]["data"]["url"],
            'permalink': data["data"]["children"][i]["data"]["permalink"]
        })
    
    vectorise_text_data = vectorise_text_data(titles, word_index)
    data_to_be_predicted = sequence.pad_sequences(vectorise_text_data, 
                                      value=word_index["<PAD>"],
                                      padding='post',
                                      maxlen=1000)
    
    # prediction = loaded_model.predict(data_to_be_predicted)[0]
    # K.clear_session()

    # get image
    imgs = []
    for d in processed_data:
        article = Article(d['url'])
        article.download()
        soup = BeautifulSoup(article.html, 'html.parser')
        img_link = soup.find("meta", property="og:image")
        if 'content' in img_link:
            imgs.append(img_link['content'])
    
    return jsonify({ 'data': processed_data, 'pred': 0.5 , 'imgs': imgs }) 

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)
