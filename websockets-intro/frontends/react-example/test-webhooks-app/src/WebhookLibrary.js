import React, { createContext } from 'react'
import {useDispatch} from 'react-redux'

const url = 'ws://localhost:3000/';
let myWebSocket = new WebSocket(url)

const WebSocketContext = createContext(null)

export {WebSocketContext}


export default ({children}) => {
    const dispatch = useDispatch()
    let libraryObject;

    function getInstance() {
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
        dispatch({type:'INCOMINGMESSAGE', payload:event.data})
    }

    libraryObject = {
        myWebSocket,
        sendMessage
    }

    return(<WebSocketContext.Provider value={libraryObject}>
        {children}
    </WebSocketContext.Provider>)
}