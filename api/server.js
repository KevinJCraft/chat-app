const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { path: "/api/socket.io" });
const shortid = require("shortid");
const moment = require("moment");
const { userJoin, getCurrentUser, userLeave, getUserList } = require("./users");
const { getReactionObject } = require("./reactionObject");
const path = require("path");

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

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.send("listening on port 4000");
  });
}
http.listen(PORT, () => {
  console.log(`listening on port 4000...`);
});
