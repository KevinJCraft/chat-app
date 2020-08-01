import React, { useState } from "react";
import Login from "./Components/Login";
import ChatBox from "./Components/ChatBox";

function App() {
  const [screenName, setScreenName] = useState("");

  const handleLogin = (e, name) => {
    e.preventDefault();
    setScreenName(name);
  };

  return !screenName ? (
    <Login handleLogin={handleLogin} />
  ) : (
    <ChatBox screenName={screenName} />
  );
}

export default App;
