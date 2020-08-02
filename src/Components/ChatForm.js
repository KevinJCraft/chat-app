import React, { useState } from "react";

const ChatForm = ({ socket, screenName }) => {
  const [message, setMessage] = useState("");

  const handleMessageSend = (e) => {
    e.preventDefault();
    socket.emit("message", { screenName, message });
    setMessage("");
  };

  return (
    <form onSubmit={handleMessageSend}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
      ></input>

      <button>send</button>
    </form>
  );
};

export default ChatForm;
