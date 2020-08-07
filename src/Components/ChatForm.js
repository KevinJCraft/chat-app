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
} from "react-bootstrap";

const ChatForm = ({ socket, screenName }) => {
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

  return (
    <Row className="flex-grow-0">
      <Container>
        <Row>
          <span className="ml-2">{message.length}/281</span>
        </Row>
        <Row>
          <Form className="flex-fill">
            <InputGroup>
              <FormControl
                autoFocus
                onSubmit={handleMessageSend}
                value={message}
                onChange={handleChangeEvent}
                type="text"
              ></FormControl>
              <InputGroup.Append>
                <Button
                  className="px-4"
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
