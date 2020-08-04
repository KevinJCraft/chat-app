import React, { useState } from "react";
import moment from "moment";

const MessageEditor = ({ message, setIsInEditMode, socket, messageId }) => {
  const [editedMessage, setEditMessage] = useState(message);

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    setIsInEditMode(false);
    if (editedMessage !== message) {
      socket.emit("editedMessage", {
        messageId,
        editedMessage,
        editTime: moment().format("ddd [at] h:mma"),
      });
    }
  };
  return (
    <form onSubmit={handleSubmitEdit}>
      <input
        onChange={(e) => setEditMessage(e.target.value)}
        value={editedMessage}
      ></input>
      <button>accept</button>
    </form>
  );
};

export default MessageEditor;
