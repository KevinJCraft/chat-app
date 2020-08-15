import React, { useState } from "react";
import Login from "./Components/Login";
import ChatApp from "./Components/ChatApp";
import ChatHeader from "./Components/ChatHeader";
import io from "socket.io-client";

import { Container } from "react-bootstrap";

const socket = io.connect("/", { path: "/api/socket.io" });

function App() {
  const [screenName, setScreenName] = useState(getSavedName());
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());
  const [isAudioOn, setIsAudioOn] = useState(getInitialAudio());
  const [users, setUsers] = useState([]);

  function getSavedName() {
    return sessionStorage.getItem("screenName") || "";
  }

  const handleLogin = (name) => {
    sessionStorage.setItem("screenName", name);
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
    if (window.localStorage.getItem("isDarkMode") === "true") {
      document.documentElement.setAttribute("data-theme", "dark");
      return true;
    } else if (window.localStorage.getItem("isDarkMode") === "false")
      return false;
    //2nd check stored preferentials, only returning value if explicitly defined as true
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("data-theme", "dark");
      return true;
    }
    //defaulting to darkMode off
    else return false;
  }

  return (
    <Container
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column justify-content-between"
    >
      <ChatHeader
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
        screenName={screenName}
        users={users}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
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
    </Container>
  );
}

export default App;
