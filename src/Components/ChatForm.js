import React, { useState } from "react";
import moment from "moment";
import { checkText } from "smile2emoji";
import { PaperAirplaneIcon } from "@primer/octicons-react";
import {
  Container,
  Row,
  Form,
  InputGroup,
  FormControl,
  Button,
  Col,
} from "react-bootstrap";

const ChatForm = ({ users, socket, screenName }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      let emojifiedText = checkText(message);
      socket.emit("message", {
        screenName,
        message: emojifiedText,
        postTime: moment().format("h:mma"),
      });
      socket.emit("isTypingNotification", { isTyping: false });
      setIsTyping(false);
      setMessage("");
    }
  };

  const handleChangeEvent = (e) => {
    if (isTyping === false) {
      socket.emit("isTypingNotification", { isTyping: true });
      setIsTyping(true);
      setTimeout(() => {
        socket.emit("isTypingNotification", { isTyping: false });
        setIsTyping(false);
      }, 7000);
    }
    if (e.target.value.length <= 281) {
      setMessage(e.target.value);
    }
  };

  const getIsTypingMessage = () => {
    let typingUsers = users.reduce((allTypingUsers, user) => {
      if (user.isTyping === true) {
        allTypingUsers.push(user.screenName);
      }
      return allTypingUsers;
    }, []);
    if (typingUsers.length === 1) {
      return `${typingUsers[0]} is typing...`;
    } else if (typingUsers.length === 2) {
      return `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
    } else if (typingUsers.length > 2) {
      return "multiple people are typing...";
    } else {
      return "";
    }
  };

  return (
    <Row className="flex-grow-0 rounded-0">
      <Container>
        <Row className="p-1 bg-primary rounded-0">
          <Col className="text-white small">
            {users.length > 0 ? getIsTypingMessage() : ""}
          </Col>
          <Col xs={{ span: 2, offset: 10 }} className="small ml-2 text-white">
            {message.length}/281
          </Col>
        </Row>
        <Row className="rounded-0">
          <Form className="flex-fill rounded-0">
            <InputGroup className="rounded-0">
              <FormControl
                onSubmit={handleMessageSend}
                value={message}
                onChange={handleChangeEvent}
                type="text"
                className="rounded-0"
              ></FormControl>
              <InputGroup.Append>
                <Button
                  className="px-4 py-1 bg-info rounded-0"
                  type="submit"
                  onClick={handleMessageSend}
                >
                  <PaperAirplaneIcon size={24} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Row>
      </Container>
    </Row>
  );
};

export default ChatForm;
