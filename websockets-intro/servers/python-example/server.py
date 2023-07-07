from flask import Flask
import sys
import asyncio
import websockets
from websockets.server import serve

print("got here 1")

app = Flask(__name__)
listOfWebsockets = set()

@app.route("/")
def rootPageRender():
    return "<p>Reached main page hosted via http</p>"

async def messageHandler1(websocket):
    listOfWebsockets.add(websocket)
    async for message in websocket:
        await websocket.send(message)

async def messageHandler(websocket):
    listOfWebsockets.add(websocket)
    async for message in websocket:
        print("message?", message)
        for ws in listOfWebsockets:
            await ws.send(message)

async def main():
    async with serve(messageHandler, "localhost", 3000):
        await asyncio.Future()  # run forever


if __name__ == '__main__':
    print("got here 12345", file=sys.stdout)
    asyncio.run(main())
    app.run(port=3000)