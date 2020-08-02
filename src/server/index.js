const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const shortid = require("shortid");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getUserList,
} = require("../utils/users");

const PORT = process.env.REACT_APP_PORT || 4000;

io.on("connection", (socket) => {
  socket.on("user-sign-in", (message) => {
    userJoin(socket.id, message.screenName);
    io.emit("message", {
      ...message,
      type: "notification",
      users: getUserList(),
      messageId: shortid(),
      reactions: [],
    });
  });
  socket.on("disconnect", (message) => {
    const user = getCurrentUser(socket.id);
    userLeave(socket.id);
    if (user) {
      io.emit("message", {
        screenName: user.screenName,
        message: "has left the chat...",
        type: "notification",
        users: getUserList(),
        messageId: shortid(),
        reactions: [],
      });
    }
  });
  socket.on("message", (message) => {
    io.emit("message", {
      ...message,
      messageId: shortid(),
      reactions: [],
      type: "message",
      users: getUserList(),
    });
  });
  socket.on("addReaction", (message) => {
    io.emit("addReaction", message);
  });
});

http.listen(PORT, () => {
  console.log(`listening on port 4000...`);
});
