import React, { useRef, useState } from "react";
import { Button, Row, Col, Popover, Overlay } from "react-bootstrap";
import {
  MuteIcon,
  UnmuteIcon,
  MoonIcon,
  SunIcon,
  PeopleIcon,
} from "@primer/octicons-react";
import UserListMobile from "./UserListMobile";

const ChatHeader = ({
  isDarkMode,
  setIsDarkMode,
  users,
  isAudioOn,
  setIsAudioOn,
  screenName,
}) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const handleChangeTheme = (event) => {
    event.currentTarget.blur();
    if (isDarkMode) {
      localStorage.setItem("isDarkMode", false);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      localStorage.setItem("isDarkMode", true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleChangeAudio = (event) => {
    event.currentTarget.blur();
    localStorage.setItem("isAudioOn", !isAudioOn);
    setIsAudioOn(!isAudioOn);
  };

  const handleShowUserClick = (event) => {
    if (!show === false) {
      event.currentTarget.blur();
    }
    setShow(!show);
  };

  const handleCloseUserlist = () => {
    setShow(false);
  };

  return (
    <Row
      style={{ height: "76px" }}
      className="primary-background text-white p-3 flex-grow-0"
    >
      <Col className="p-0 algin-middle">
        <h3 className=" p-1 m-0 align-middle">CHAT-APP</h3>
      </Col>
      <Col className="text-right p-0">
        <Button
          onClick={handleChangeAudio}
          type="checkbox"
          id="isAudioOn"
          className="p-2 primary-background"
        >
          {isAudioOn ? <UnmuteIcon size={24} /> : <MuteIcon size={24} />}
        </Button>
        <Button
          onClick={handleChangeTheme}
          type="checkbox"
          id="theme"
          className="mx-1 p-2 primary-background"
        >
          {isDarkMode ? <MoonIcon size={24} /> : <SunIcon size={24} />}
        </Button>
        <Button
          ref={ref}
          onBlur={handleCloseUserlist}
          onClick={handleShowUserClick}
          className="primary-background"
        >
          <PeopleIcon size={24} />
        </Button>
        <Overlay
          show={show}
          target={ref}
          placement="bottom"
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Title className="white-background black-text" as="h3">
              online
            </Popover.Title>
            <Popover.Content className="white-background black-text">
              {users.length > 0 ? (
                <UserListMobile users={users} />
              ) : (
                "noone online"
              )}
            </Popover.Content>
          </Popover>
        </Overlay>
      </Col>
    </Row>
  );
};

export default ChatHeader;
