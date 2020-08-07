import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Button, Row, Col, Popover, Overlay } from "react-bootstrap";
import {
  MuteIcon,
  UnmuteIcon,
  MoonIcon,
  SunIcon,
  PeopleIcon,
} from "@primer/octicons-react";
import UserListMobile from "./UserListMobile";

const ChatHeader = ({ users, isAudioOn, setIsAudioOn, screenName }) => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const ref = useRef(null);

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
    <Row className="bg-primary text-white p-3 flex-grow-0">
      <Col className="p-0 algin-middle">
        <h3 className=" p-1 m-0 align-middle">CHAT-APP</h3>
      </Col>
      <Col className="text-right p-0">
        <Button
          onClick={handleChangeAudio}
          type="checkbox"
          id="isAudioOn"
          variant="primary"
          className="p-2 rounded-circle"
        >
          {isAudioOn ? <UnmuteIcon size={24} /> : <MuteIcon size={24} />}
        </Button>
        <Button
          onClick={handleChangeTheme}
          type="checkbox"
          id="theme"
          variant="primary"
          className="mx-1 p-2 rounded-circle"
        >
          {isDarkMode ? <MoonIcon size={24} /> : <SunIcon size={24} />}
        </Button>
        <Button
          ref={ref}
          onBlur={handleCloseUserlist}
          onClick={handleShowUserClick}
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
            <Popover.Title as="h3">online</Popover.Title>
            <Popover.Content>
              <UserListMobile users={users} />
            </Popover.Content>
          </Popover>
        </Overlay>
      </Col>
    </Row>
  );
};

export default ChatHeader;
