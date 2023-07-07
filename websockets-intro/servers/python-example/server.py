from flask import Flask
import asyncio
from websockets.server import serve

app = Flask(__name__)
listOfWebsockets = set()

@app.route("/")
def rootPageRender():
    return "<p>Reached main page hosted via http</p>"

async def messageHandler(websocket):
    listOfWebsockets.add(websocket)
    async for message in websocket:
        for ws in listOfWebsockets:
            await ws.send(message)

async def main():
    async with serve(messageHandler, "localhost", 3000):
        await asyncio.Future()  # run forever


if __name__ == '__main__':
    asyncio.run(main())
    app.run(port=3000)