import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import ChatForm from "./ChatForm";
import ChatBox from "./ChatBox";
import moment from "moment";
import ChatHeader from "./ChatHeader";

const enterChatAudio = new Audio(require("../utils/audio/open_door_1.mp3"));
const exitChatAudio = new Audio(require("../utils/audio/close_door_1.mp3"));
const sendMessageAudio = new Audio(require("../utils/audio/intuition.mp3"));
const getMessageAudio = new Audio(require("../utils/audio/when.mp3"));
const newReactionAudio = new Audio(require("../utils/audio/reaction.mp3"));
const removeReactionAudio = new Audio(
  require("../utils/audio/removeReaction.mp3")
);
const editMessageAudio = new Audio(require("../utils/audio/editMessage.mp3"));

function ChatApp({ screenName, socket }) {
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const [isAudioOn, setIsAudioOn] = useState(true);

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
      isAudioOn && messageAudio.play();
      setChat([...chat, message]);
    });
    socket.on("newUser", (message) => {
      setChat([...chat, message]);
      setUsers(message.users);
      isAudioOn && enterChatAudio.play();
    });
    socket.on("userLeft", (message) => {
      setChat([...chat, message]);
      setUsers(message.users);
      isAudioOn && exitChatAudio.play();
    });
    socket.on("addReaction", (newReaction) => {
      const newChat = chat.map((message) => {
        //get the efffected message
        if (newReaction.messageId === message.messageId) {
          //add id of person who sent reaction to array for that reaction IF that user had not already chosen that reaction
          let index = message.reactions[newReaction.emoji].indexOf(
            newReaction.userId
          );
          if (index === -1) {
            message.reactions[newReaction.emoji].push(newReaction.userId);
            isAudioOn && newReactionAudio.play();
          } else {
            message.reactions[newReaction.emoji].splice(index, 1);
            isAudioOn && removeReactionAudio.play();
          }
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
      isAudioOn && editMessageAudio.play();
      setChat(newChat);
    });
    return () => socket.off();
  }, [chat, users, socket]);

  return (
    <div className="App">
      <ChatHeader
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
        screenName={screenName}
      />
      <UserList users={users} />
      <ChatForm socket={socket} screenName={screenName} />

      <ChatBox socket={socket} chat={chat} />
    </div>
  );
}

export default ChatApp;
