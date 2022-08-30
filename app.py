from flask import Flask, jsonify, render_template
import configparser
import tweepy
from flask_cors import CORS

# Read configs
config = configparser.ConfigParser()
config.read('config.ini')

api_key = config['twitter']['api_key']
api_key_secret = config['twitter']['api_key_secret']

access_token = config['twitter']['access_token']
access_token_secret = config['twitter']['access_token_secret']

# Authenticate app with Twitter API
auth = tweepy.OAuthHandler(api_key, api_key_secret)
auth.set_access_token(access_token, access_token_secret)

# Create API instance
api = tweepy.API(auth)

# Initialise app
app = Flask(__name__)

# enable cors for dev
CORS(app)

# Get data from Twitter
def get_favorites(username, last_id = None):
  images = []
  last_max_id = last_id
  min_images = 30
  count = 0
  max_iterations = 1

  while len(images) < min_images and count < max_iterations:
    count+= 1
    posts = api.get_favorites(screen_name=username, count=20, include_entities=True, tweet_mode="extended", max_id=last_max_id)
    for post in posts:
      last_max_id = post.id
      try:
        if 'media' in post.extended_entities:
          for image in post.extended_entities['media']:
            if (image['type']) == "photo":
              images.append(image['media_url'])
      except AttributeError:
        print("No media on this post by " + post.user.screen_name)  
  
  data = {"images": images, "last_id": last_max_id}
  return data

# Routes
@app.route("/<username>", methods=['GET'])
@app.route("/<username>/<last_id>", methods=['GET'])
def get(username, last_id = None):
  data = get_favorites(username, last_id)
  response = jsonify(data)
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response

@app.route("/")
def home():
  return render_template("index.html")

# Run server
if __name__ == '__main__':
  app.run()
  # app.run(debug=True)