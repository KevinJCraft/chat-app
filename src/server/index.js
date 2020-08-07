const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const shortid = require("shortid");
const moment = require("moment");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getUserList,
} = require("../utils/users");
const { getReactionObject } = require("../utils/reactionObject");

const PORT = process.env.REACT_APP_PORT || 4000;

io.on("connection", (socket) => {
  socket.on("screenNameCheck", (data) => {
    const users = getUserList();

    let isAvailable = true;
    users.forEach((user) => {
      if (user.screenName === data.screenName) {
        isAvailable = false;
      }
    });
    io.to(socket.id).emit("screenNameCheck", { isAvailable });
  });
  socket.on("user-sign-in", (message) => {
    userJoin(socket.id, message.screenName);
    io.emit("newUser", {
      ...message,
      type: "notification",
      users: getUserList(),
      messageId: shortid(),
      editTime: "",
    });
  });
  socket.on("disconnect", (message) => {
    const user = getCurrentUser(socket.id);
    userLeave(socket.id);
    if (user) {
      io.emit("userLeft", {
        screenName: user.screenName,
        message: "has left the chat",
        type: "notification",
        users: getUserList(),
        messageId: shortid(),
        postTime: moment().format("h:mma"),
      });
    }
  });
  socket.on("message", (message) => {
    io.emit("message", {
      ...message,
      messageId: shortid(),
      userId: socket.id,
      reactions: getReactionObject(),
      type: "message",
      users: getUserList(),
    });
  });
  socket.on("addReaction", (message) => {
    io.emit("addReaction", message);
  });
  socket.on("isTypingNotification", (data) => {
    io.emit("isTypingNotification", { ...data, id: socket.id });
  });
  socket.on("editedMessage", (data) => {
    io.emit("editedMessage", data);
  });
});

http.listen(PORT, () => {
  console.log(`listening on port 4000...`);
});
