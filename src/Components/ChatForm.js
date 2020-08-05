import React, { useState } from "react";
import moment from "moment";
import { checkText } from "smile2emoji";

const ChatForm = ({ socket, screenName }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      let emojifiedText = checkText(message);
      socket.emit("message", {
        screenName,
        message: emojifiedText,
        postTime: moment().format("ddd [at] h:mma"),
      });
      socket.emit("isTypingNotification", { isTyping: false });
      setIsTyping(false);
      setMessage("");
    }
  };

  const handleChangeEvent = (e) => {
    if (isTyping === false) {
      socket.emit("isTypingNotification", { isTyping: true });
      setIsTyping(true);
      setTimeout(() => {
        socket.emit("isTypingNotification", { isTyping: false });
        setIsTyping(false);
      }, 7000);
    }
    if (e.target.value.length <= 281) {
      setMessage(e.target.value);
    }
  };

  return (
    <form>
      <input
        autoFocus
        onSubmit={handleMessageSend}
        value={message}
        onChange={handleChangeEvent}
        type="text"
      ></input>

      <button type="submit" onClick={handleMessageSend}>
        send
      </button>
      <div>
        <span>{message.length}/281</span>
      </div>
    </form>
  );
};

export default ChatForm;
