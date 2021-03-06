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
    e.currentTarget.blur();
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
    <Row
      style={{ height: "65px" }}
      className="px-2 flex-grow-0 rounded-0 primary-background"
    >
      <Container className="primary-background">
        <Row className="rounded-0">
          <Form className="flex-fill rounded-0 border-0">
            <InputGroup className="rounded-0 border-0">
              <FormControl
                onSubmit={handleMessageSend}
                value={message}
                onChange={handleChangeEvent}
                type="text"
                placeholder="   Send message to ..."
                className="message-input rounded-0 border-0 primary-background text-white"
              />
              <InputGroup.Append>
                <Button
                  className="px-4 py-1 primary-background rounded-0"
                  type="submit"
                  onClick={handleMessageSend}
                >
                  <PaperAirplaneIcon size={24} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Row>
        <Row className="p-1 primary-background rounded-0">
          <Col className="text-white small">
            {users.length > 0 ? getIsTypingMessage() : ""}
          </Col>
          <Col xs={{ span: 2, offset: 10 }} className="small ml-2 text-white">
            {message.length}/281
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default ChatForm;
