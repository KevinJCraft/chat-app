import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const ChatHeader = ({ isAudioOn, setIsAudioOn, screenName }) => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const handleChangeTheme = () => {
    localStorage.setItem("isDarkMode", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const handleChangeAudio = (event) => {
    localStorage.setItem("isAudioOn", !isAudioOn);
    setIsAudioOn(!isAudioOn);
  };

  return (
    <div>
      <h3>Welcome {screenName}</h3>
      <label htmlFor="isAudioOn">Audio</label>
      <input
        checked={isAudioOn}
        onChange={handleChangeAudio}
        type="checkbox"
        id="isAudioOn"
      />
      <br />
      <label htmlFor="theme">Dark Mode</label>
      <input
        checked={isDarkMode}
        onChange={handleChangeTheme}
        type="checkbox"
        id="theme"
      />
    </div>
  );
};

export default ChatHeader;
