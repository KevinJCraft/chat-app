import React, { useState } from "react";
import { EmojiButton } from "@joeattardi/emoji-button";
import moment from "moment";

const ChatForm = ({ socket, screenName }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      socket.emit("message", {
        screenName,
        message,
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
      <span onClick={triggerPicker}>😊</span>
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
