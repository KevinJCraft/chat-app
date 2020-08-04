import React from "react";

const ChatHeader = ({ isAudioOn, setIsAudioOn, screenName }) => {
  return (
    <div>
      <h3>Welcome {screenName}</h3>
      <label for="isAudioOn">Audio</label>
      <input
        checked={isAudioOn}
        onClick={() => setIsAudioOn(!isAudioOn)}
        type="checkbox"
        id="isAudioOn"
      />
    </div>
  );
};

export default ChatHeader;
