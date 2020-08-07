import React, { useState } from "react";
import MessageEditor from "./MessageEditor";
import emoji from "react-easy-emoji";
import { Row, Col } from "react-bootstrap";

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
      userId: socket.id,
    });
    setShowEmojis(false);
  };

  const handleEdit = () => {
    setIsInEditMode(!isInEditMode);
  };

  const getEmojis = () => {
    return Object.keys(reactions);
  };

  const renderEmojiPicker = () => {
    const emojis = getEmojis();
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
  const displayReactions = () => {
    let string = "";
    if (type === "message" || type === "ownMessage") {
      Object.entries(reactions).forEach((arr, index) => {
        if (arr[1].length > 0) {
          string += `${arr[0]}x${arr[1].length}`;
        }
      });
    }
    return emoji(string);
  };
  return (
    <Row className="align-bottom w-90 mxauto my-2">
      <Col xs={{ span: 10, offset: 1 }} className="bg-primary rounded">
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
        <div>{displayReactions()}</div>
        {screenName}: {type === "message" && renderEmojiPicker()}
      </Col>
    </Row>
  );
};

export default Message;
