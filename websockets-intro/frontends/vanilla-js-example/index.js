console.log("got here: index.js")
var url = 'ws://localhost:3000/'
var myWebSocket = new WebSocket(url)

document.getElementById("submit-form").addEventListener("click", handleMessageSubmission)

function handleMessageSubmission(){
    var sendingUser = document.getElementById("message-username").value
    var message = document.getElementById("message").value
    if(!sendingUser || !message){
        alert("missing either sending user or message")
        return
    }

    var payload = {
        user: sendingUser,
        message: message
    }
    myWebSocket.send(JSON.stringify(payload))
}

myWebSocket.onmessage = function(event){
    var obj = JSON.parse(event.data)
    var bubble = document.createElement("div")
    bubble.className = "bubble"
    var bubble_msg = document.createElement("p")
    bubble_msg.innerText = obj.message
    bubble_user = document.createElement("span")
    bubble_user.innerText = '- '+obj.user
    bubble.append(bubble_msg)
    bubble.append(bubble_user)
    document.getElementById("realtime-chat-display").append(bubble)
}