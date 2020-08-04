import React, { useState } from "react";
import MessageEditor from "./MessageEditor";

const emojis = ["👍", "👎", "😊", "🥺", "😉", "😍", "😜", "😂", "😢"];

const Message = ({
  reactions,
  messageId,
  message,
  screenName,
  type,
  socket,
  editTime,
  postTime,
}) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleSetReaction = (emoji) => {
    socket.emit("addReaction", {
      messageId,
      emoji,
    });
    setShowEmojis(false);
  };

  const handleEdit = () => {
    setIsInEditMode(!isInEditMode);
  };

  const renderEmojiPicker = () => {
    if (showEmojis) {
      return emojis.map((emoji, index) => (
        <span key={index} onClick={() => handleSetReaction(emoji)}>
          {emoji}
        </span>
      ));
    } else {
      return <span onClick={() => setShowEmojis(true)}>+</span>;
    }
  };
  return (
    <li>
      <div>
        {screenName}:{" "}
        {isInEditMode ? (
          <MessageEditor
            socket={socket}
            messageId={messageId}
            setIsInEditMode={setIsInEditMode}
            message={message}
          />
        ) : (
          <>
            <span>{message}</span>
            {editTime ? (
              <div style={{ fontSize: "smallest" }}>
                <span>edited on {editTime}</span>
              </div>
            ) : (
              <div style={{ fontSize: "small" }}>
                <span>{postTime}</span>
              </div>
            )}
          </>
        )}
        {type === "ownMessage" && (
          <div>
            <button onClick={handleEdit}>
              {isInEditMode ? "cancel" : "edit"}
            </button>
          </div>
        )}
        <div>
          {reactions.map((reaction, index) => (
            <span key={index}>{reaction}</span>
          ))}
        </div>
      </div>
      {type === "message" && renderEmojiPicker()}
    </li>
  );
};

export default Message;
