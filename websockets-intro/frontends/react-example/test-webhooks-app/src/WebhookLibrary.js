import React, { createContext } from 'react'

const WebSocketContext = createContext(null)

export {WebSocketContext}


export default ({children}) => {
    console.log("got here: webhooklibrary.js default export")
    const url = 'ws://localhost:3000/';
    let myWebSocket;
    let libraryObject;

    function createInstance() {
        return new WebSocket(url)
    }

    function getInstance() {
        if (!myWebSocket){
            myWebSocket = createInstance()
        }
        return myWebSocket
    }

    const sendMessage = (message, sendingUser) => {
        if(!sendingUser || !message){
            alert("missing either sending user or message")
            return
        }

        let payload = {
            user: sendingUser,
            message: message
        }
        getInstance().send(JSON.stringify(payload))
    }

    getInstance().onmessage = (event) => {
        console.log("got event data here: ")
        console.log(event.data)
    }

    libraryObject = {
        myWebSocket,
        sendMessage
    }

    return(<WebSocketContext.Provider value={libraryObject}>
        {children}
    </WebSocketContext.Provider>)
}