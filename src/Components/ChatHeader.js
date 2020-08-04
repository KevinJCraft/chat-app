import React from "react";

const ChatHeader = ({ isAudioOn, setIsAudioOn, screenName }) => {
  return (
    <div>
      <h3>Welcome {screenName}</h3>
      <label htmlFor="isAudioOn">Audio</label>
      <input
        checked={isAudioOn}
        onChange={() => setIsAudioOn(!isAudioOn)}
        type="checkbox"
        id="isAudioOn"
      />
    </div>
  );
};

export default ChatHeader;
