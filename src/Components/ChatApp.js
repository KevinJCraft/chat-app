import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import ChatForm from "./ChatForm";
import ChatBox from "./ChatBox";

function ChatApp({ screenName, socket }) {
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("user-sign-in", {
      screenName,
      message: "has entered the chat",
    });
  }, [screenName, socket]);

  useEffect(() => {
    socket.on("message", (message) => {
      if (message.userId === socket.id) {
        message.type = "ownMessage";
      }
      setChat([...chat, message]);
    });
    socket.on("newUser", (message) => {
      setChat([...chat, message]);
      setUsers(message.users);
    });
    socket.on("userLeft", (message) => {
      setChat([...chat, message]);
      setUsers(message.users);
    });
    socket.on("addReaction", (newReaction) => {
      const newChat = chat.map((message) => {
        if (newReaction.messageId === message.messageId) {
          message.reactions.push(newReaction.emoji);
        }
        return message;
      });
      setChat(newChat);
    });
    socket.on("isTypingNotification", (data) => {
      const newUsers = users.map((user) => {
        if (user.id === data.id) {
          user.isTyping = data.isTyping;
        }
        return user;
      });
      setUsers(newUsers);
    });
    socket.on("editedMessage", (data) => {
      const newChat = chat.map((message) => {
        if (data.messageId === message.messageId) {
          message.message = data.editedMessage;
          message.editTime = data.editTime;
        }
        return message;
      });
      setChat(newChat);
    });
    return () => socket.off();
  }, [chat, users, socket]);

  return (
    <div className="App">
      <h3>Welcome {screenName}</h3>
      <UserList users={users} />
      <ChatForm socket={socket} screenName={screenName} />

      <ChatBox socket={socket} chat={chat} />
    </div>
  );
}

export default ChatApp;
