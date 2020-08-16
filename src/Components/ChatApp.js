import React, { useState, useEffect, useCallback } from "react";
import ChatForm from "./ChatForm";
import ChatBox from "./ChatBox";
import moment from "moment";

const enterChatAudio = new Audio(require("../utils/audio/open_door_1.mp3"));
const exitChatAudio = new Audio(require("../utils/audio/close_door_1.mp3"));
const sendMessageAudio = new Audio(require("../utils/audio/sendMessage.mp3"));
const getMessageAudio = new Audio(require("../utils/audio/getMessage.mp3"));
const newReactionAudio = new Audio(require("../utils/audio/addReaction.mp3"));
const removeReactionAudio = new Audio(
  require("../utils/audio/removeReaction.mp3")
);

function ChatApp({ users, setUsers, screenName, socket, isAudioOn }) {
  const [chat, setChat] = useState(getChat());

  const playAudio = useCallback(
    (audio) => {
      if (isAudioOn) {
        audio.play().catch((err) => console.log(err));
      }
    },
    [isAudioOn]
  );

  function getChat() {
    let oldChat = JSON.parse(sessionStorage.getItem("chat"));
    return oldChat || [];
  }

  useEffect(() => {
    socket.emit("user-sign-in", {
      screenName,
      message: "has entered the chat",
      postTime: moment().format("h:mma"),
    });
  }, [screenName, socket]);

  useEffect(() => {
    let messageAudio = getMessageAudio;
    socket.on("message", (message) => {
      if (message.userId === socket.id) {
        message.type = "ownMessage";
        messageAudio = sendMessageAudio;
      }
      playAudio(messageAudio);
      setChat([...chat, message]);
    });
    socket.on("newUser", (message) => {
      setChat([...chat, message]);
      setUsers(message.users);
      playAudio(enterChatAudio);
    });
    socket.on("userLeft", (message) => {
      setChat([...chat, message]);
      setUsers(message.users);
      playAudio(exitChatAudio);
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
            playAudio(newReactionAudio);
          } else {
            message.reactions[newReaction.emoji].splice(index, 1);
            playAudio(removeReactionAudio);
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
    return () => socket.off();
  }, [chat, users, socket, isAudioOn, setUsers, playAudio]);

  useEffect(() => {
    sessionStorage.setItem("chat", JSON.stringify(chat));
  }, [chat]);

  return (
    <>
      <ChatBox socket={socket} chat={chat} />
      <ChatForm users={users} socket={socket} screenName={screenName} />
    </>
  );
}

export default ChatApp;
