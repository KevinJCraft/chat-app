import React, { useState } from "react";
import Login from "./Components/Login";
import ChatApp from "./Components/ChatApp";

function App() {
  const [screenName, setScreenName] = useState("");

  const handleLogin = (e, name) => {
    e.preventDefault();
    setScreenName(name);
  };

  return !screenName ? (
    <Login handleLogin={handleLogin} />
  ) : (
    <ChatApp screenName={screenName} />
  );
}

export default App;
