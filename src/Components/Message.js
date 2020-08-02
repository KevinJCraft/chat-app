import React, { useState } from "react";

const emojis = ["X", "Y", "Z", "L"];

const Message = ({
  reactions,
  messageId,
  message,
  screenName,
  type,
  socket,
}) => {
  const [showEmojis, setShowEmojis] = useState(false);

  const handleSetReaction = (emoji) => {
    socket.emit("addReaction", {
      messageId,
      emoji,
    });
    setShowEmojis(false);
  };
  return (
    <li>
      <div>
        {screenName}: {message}
        <div>
          {reactions.map((reaction, index) => (
            <span key={index}>{reaction}</span>
          ))}
        </div>
      </div>

      {!showEmojis ? (
        <span onClick={() => setShowEmojis(true)}>+</span>
      ) : (
        emojis.map((emoji, index) => (
          <span key={index} onClick={() => handleSetReaction(emoji)}>
            {emoji}
          </span>
        ))
      )}
    </li>
  );
};

export default Message;
