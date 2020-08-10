import React, { useState } from "react";
import Login from "./Components/Login";
import ChatApp from "./Components/ChatApp";
import ChatHeader from "./Components/ChatHeader";
import io from "socket.io-client";
import { ThemeContext } from "./Context/ThemeContext";

import { Container } from "react-bootstrap";

const socket = io.connect("localhost:4000");

function App() {
  const [screenName, setScreenName] = useState("Kevin");
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());
  const [isAudioOn, setIsAudioOn] = useState(getInitialAudio());
  const [users, setUsers] = useState([]);

  const handleLogin = (name) => {
    setScreenName(name);
  };

  function getInitialAudio() {
    if (window.localStorage.getItem("isAudioOn") === "false") {
      return false;
    } else {
      return true;
    }
  }

  function getInitialTheme() {
    if (window.localStorage.getItem("isDarkMode") === "true") return true;
    else if (window.localStorage.getItem("isDarkMode") === "false")
      return false;
    //2nd check stored preferentials, only returing value if explicitly defined as true
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      return true;
    //defaulting to darkMode off
    else return false;
  }

  return (
    <Container
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column justify-content-between"
    >
      <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        <ChatHeader
          isAudioOn={isAudioOn}
          setIsAudioOn={setIsAudioOn}
          screenName={screenName}
          users={users}
        />

        {!screenName ? (
          <Login socket={socket} handleLogin={handleLogin} />
        ) : (
          <ChatApp
            isAudioOn={isAudioOn}
            socket={socket}
            screenName={screenName}
            users={users}
            setUsers={setUsers}
          />
        )}
      </ThemeContext.Provider>
    </Container>
  );
}

export default App;
