import {useContext} from 'react'

import MessageForm from "./MessageForm"
import Message from "./Message"
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {WebSocketContext} from "./WebhookLibrary";

import { useSelector, useDispatch } from 'react-redux'
import {selectMessages} from './mySelectors'


function App() {
    const messages = useSelector(selectMessages)
    const dispatch = useDispatch()
    const websocketContextObj = useContext(WebSocketContext)

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
