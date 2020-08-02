import React from "react";
import Message from "./Message";

const ChatBox = ({ chat, socket }) => {
  return (
    <ul>
      {chat.map((data, index) => {
        return (
          <Message
            type={data.type}
            screenName={data.screenName}
            message={data.message}
            key={index}
            socket={socket}
            messageId={data.messageId}
            reactions={data.reactions}
          />
        );
      })}
    </ul>
  );
};

export default ChatBox;
