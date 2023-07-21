const express = require('express')
const WebSocket = require("ws");
const process = require('node:process');


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Server is running!')
})

const httpServer = app.listen(port, () => {
  console.log(`httpServer listening on port ${port}`)
})

const wsServer = new WebSocket.Server({noServer: true})

wsServer.on("connection", (ws)=>{
  ws.on("message", (message)=>{
    wsServer.clients.forEach((client)=>{
      if(client.readyState === WebSocket.OPEN){
        client.send(message.toString());
      }
    })
  })

  ws.on("error", (error)=>{console.log("an error occurred: ", error)})

  ws.on("close", ()=>{console.log("connection has closed")})

})

httpServer.on('upgrade', (request, socket, head)=>{
  socket.on('error', (error)=>{console.log(error)})
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit('connection', ws, request)
  })
} )

process.on('SIGINT', (code) => {
  wsServer.clients.forEach((client)=>{
    client.close()
  })
  process.exit()
});