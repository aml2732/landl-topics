import {useState, useContext} from 'react'
import "./MessageForm.css"
import Button from 'react-bootstrap/Button';
import {WebSocketContext} from "./WebhookLibrary";

function MessageForm({user, message}) {
    const websocketContextObj = useContext(WebSocketContext)
    const [sendingUser, setSendingUser] = useState("")
    const [messageToSend, setMessageToSend] = useState("null")
    const handleSubmit = ()=>{
        websocketContextObj.sendMessage(messageToSend, sendingUser)
    }

    return (
      <div id="chat-form">
          <div className="field-containers">
              <label htmlFor="message-username">User:</label>
              <input type="text" id="message-username" value={sendingUser} onInput={e=>setSendingUser(e.target.value)}/>
          </div>

          <div className="field-containers">
              <label htmlFor="message">Message</label>
              <textarea type="text" id="message" value={messageToSend} onInput={e=>setMessageToSend(e.target.value)}></textarea>
          </div>

          <Button id="submit-form" onClick={handleSubmit}>submit</Button>
      </div>
    );
}

export default MessageForm;
