import React, { useState } from "react";
import { EmojiButton } from "@joeattardi/emoji-button";

const ChatForm = ({ socket, screenName }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleMessageSend = (e) => {
    e.preventDefault();
    socket.emit("message", { screenName, message });
    socket.emit("isTypingNotification", { isTyping: false });
    setIsTyping(false);

    setMessage("");
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
    setMessage(e.target.value);
  };

  const triggerPicker = (e) => {
    e.preventDefault();
    const picker = new EmojiButton({
      position: "right-start",
    });

    picker.on("emoji", (selection) => {
      setMessage(message + selection.emoji);
    });

    picker.togglePicker(e.target);
  };

  return (
    <form>
      <input value={message} onChange={handleChangeEvent} type="text"></input>

      <button onClick={triggerPicker}>😊</button>
      <button onClick={handleMessageSend}>send</button>
    </form>
  );
};

export default ChatForm;
