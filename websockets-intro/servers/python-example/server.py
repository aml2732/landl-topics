from flask import Flask
import asyncio
from websockets.server import serve
import atexit

app = Flask(__name__)
listOfWebsockets = set()

@app.route("/")
def rootPageRender():
    return "<p>Reached main page hosted via http</p>"

async def messageHandler(websocket):
    listOfWebsockets.add(websocket)
    try:
        async for message in websocket:
            for ws in listOfWebsockets:
                await ws.send(message)
        await websocket.wait_closed()
    finally:
        listOfWebsockets.remove(websocket)



async def main():
    async with serve(messageHandler, "localhost", 3000):
        await asyncio.Future()  # run forever

async def closeAllClientConnections():
    for ws in listOfWebsockets:
        await ws.close()

if __name__ == '__main__':
    asyncio.run(main())
    atexit.register(closeAllClientConnections)
    app.run(port=3000)