import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Button, Row, Col } from "react-bootstrap";
import {
  MuteIcon,
  UnmuteIcon,
  MoonIcon,
  SunIcon,
} from "@primer/octicons-react";

const ChatHeader = ({ isAudioOn, setIsAudioOn, screenName }) => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const handleChangeTheme = (event) => {
    event.currentTarget.blur();
    localStorage.setItem("isDarkMode", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const handleChangeAudio = (event) => {
    event.currentTarget.blur();
    localStorage.setItem("isAudioOn", !isAudioOn);
    setIsAudioOn(!isAudioOn);
  };

  return (
    <Row
      className={
        isDarkMode
          ? "bg-dark text-white p-3 flex-grow-0"
          : "bg-primary text-white p-3 flex-grow-0"
      }
    >
      <Col className="p-0">
        <h3>CHAT-APP</h3>
      </Col>
      <Col className="text-right p-0">
        <Button
          onClick={handleChangeAudio}
          type="checkbox"
          id="isAudioOn"
          variant={isDarkMode ? "dark" : "primary"}
          className="p-2 rounded-circle"
        >
          {isAudioOn ? <UnmuteIcon size={24} /> : <MuteIcon size={24} />}
        </Button>
        <Button
          onClick={handleChangeTheme}
          type="checkbox"
          id="theme"
          variant={isDarkMode ? "dark" : "primary"}
          className="mx-1 p-2 rounded-circle"
        >
          {isDarkMode ? <MoonIcon size={24} /> : <SunIcon size={24} />}
        </Button>
      </Col>
    </Row>
  );
};

export default ChatHeader;
