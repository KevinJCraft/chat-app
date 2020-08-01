import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function ChatBox({ screenName }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);

  const handleMessageSend = (e) => {
    e.preventDefault();
    socket.emit("message", { screenName, message });
    setMessage("");
  };

  const renderUserList = () => {
    return (
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    );
  };

  const renderChat = () => {
    return (
      <ul>
        {chat.map((data, index) => {
          const style = data.type === "message" ? "normal" : "italic";
          return (
            <li key={index} style={{ fontStyle: style }}>
              {data.screenName}: {data.message}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    socket.emit("user-sign-in", {
      screenName,
      message: "has entered the chat",
    });
  }, [screenName]);

  useEffect(() => {
    socket.on("message", (message) => {
      setChat([...chat, message]);
      setUsers(message.users);
    });
  }, [chat]);

  return (
    <div className="App">
      <div>
        <h3>Users:</h3>
        {renderUserList()}
      </div>
      <form onSubmit={handleMessageSend}>
        <h3>Welcome {screenName}</h3>
        <div>
          <label>message</label>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
          ></input>
        </div>
        <button>send</button>
      </form>
      {renderChat()}
    </div>
  );
}

export default ChatBox;
