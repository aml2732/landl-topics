import {useContext} from 'react'

import MessageForm from "./MessageForm"
import Message from "./Message"
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {WebSocketContext} from "./WebhookLibrary";


function App() {
    const websocketContextObj = useContext(WebSocketContext)
    let messages = [{user: "test user", message: "test message"}];
  return (
      <div className="App">
        <Container>
            <Row><Col>
                {messages.map((m,i) => (<Message user={m.user} message={m.message} key={i}></Message>)
                ) || <p>No messages at this point in time</p>}

            </Col></Row>

            <Row><Col>
                <MessageForm />
            </Col></Row>
        </Container>
    </div>
  );
}

export default App;
