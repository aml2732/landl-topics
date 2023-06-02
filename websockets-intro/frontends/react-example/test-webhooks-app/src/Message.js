import "./Message.css"

function Message({user, message}) {
  return (
    <div className="message-container">
      <p>{message}</p>
      <span>- {user}</span>
    </div>
  );
}

export default Message;
