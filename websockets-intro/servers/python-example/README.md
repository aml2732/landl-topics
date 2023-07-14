## Steps I used to set this up: 
Following these instructions: https://www.geeksforgeeks.org/flask-creating-first-simple-application/
- `pip3 install virtualenv`
- `python3 -m virtualenv venv`
- `. venv/bin/activate`
- `pip3 install Flask`
- `pip3 install websockets`
- ~~`pip3 install flask-socketio`~~
- ~~`pip3 install websocket`~~
- ~~`pip3 install websocket-client`~~
- `pip3 install asyncio`

## Steps to run / Development
- Activate virtual env `. venv/bin/activate`
- Set flask port to be 3000`export FLASK_RUN_PORT=3000`
- Running application: `flask --app server run`
- `python server.py`
- Should be running on : `http://127.0.0.1:3000`
- Kill server between changes with ctrl-c
