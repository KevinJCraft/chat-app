import React, { useState } from "react";
import Login from "./Components/Login";
import ChatApp from "./Components/ChatApp";
import io from "socket.io-client";

const socket = io.connect("localhost:4000");

function App() {
  const [screenName, setScreenName] = useState("");

  const handleLogin = (name) => {
    setScreenName(name);
  };

  return !screenName ? (
    <Login socket={socket} handleLogin={handleLogin} />
  ) : (
    <ChatApp socket={socket} screenName={screenName} />
  );
}

export default App;
