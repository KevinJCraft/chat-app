import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import UserList from "./UserList";
import ChatForm from "./ChatForm";
import ChatBox from "./ChatBox";

const socket = io.connect("http://localhost:4000");

function ChatApp({ screenName }) {
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("user-sign-in", {
      screenName,
      message: "has entered the chat",
    });
  }, [screenName]);

  useEffect(() => {
    socket.on("message", (message) => {
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
    return () => socket.off();
  }, [chat, users]);

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
