# Twitter Mood Board

### Please note: due to changes to the Twitter API, this app is now deprecated.

Searches through a user's liked/favourited posts to scrape images and display them on an endless canvas to the user. Back-end was made in Python with Flask and the front-end is vanilla JavaScript and HTML/CSS.

The app is deployed at the link in the About section. Note that the first launch may take some time as the server will likely be idling.

### Features:

- Integrated with Twitter API
- Back-end made in Flask (Python)
- Shuffle images to change order
- Load more images itiratively
- Individual images can be deleted
- Zoom in and out to scale the canvas

### Technologies used:

- Python
- Flask
- JavaScript
- HTML/CSS

### Running the app locally

After cloning the repo, install dependencies from the pipfile:

```
pipenv install
```

Run the server

```
python app.py
```

Navigate to the server URL in your browser:

```
http://127.0.0.1:5000
```
