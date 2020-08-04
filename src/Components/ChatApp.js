import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import ChatForm from "./ChatForm";
import ChatBox from "./ChatBox";
import moment from "moment";

const enterChatAudio = new Audio(require("../utils/audio/open_door_1.mp3"));
const exitChatAudio = new Audio(require("../utils/audio/close_door_1.mp3"));
const sendMessageAudio = new Audio(require("../utils/audio/intuition.mp3"));
const getMessageAudio = new Audio(require("../utils/audio/when.mp3"));

function ChatApp({ screenName, socket }) {
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("user-sign-in", {
      screenName,
      message: "has entered the chat",
      postTime: moment().format("ddd [at] h:mma"),
    });
  }, [screenName, socket]);

  useEffect(() => {
    let messageAudio = getMessageAudio;
    socket.on("message", (message) => {
      if (message.userId === socket.id) {
        message.type = "ownMessage";
        messageAudio = sendMessageAudio;
      }
      messageAudio.play();
      setChat([...chat, message]);
    });
    socket.on("newUser", (message) => {
      setChat([...chat, message]);
      setUsers(message.users);
      enterChatAudio.play();
    });
    socket.on("userLeft", (message) => {
      setChat([...chat, message]);
      setUsers(message.users);
      exitChatAudio.play();
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
