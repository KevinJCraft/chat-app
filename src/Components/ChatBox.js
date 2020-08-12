import React from "react";
import Message from "./Message";
import { Container, Row } from "react-bootstrap";
import Notification from "./Notification";

const ChatBox = ({ chat, socket }) => {
  return (
    <>
      <Row className="flex-grow-1 overflow-auto white-background">
        <Container style={{ alignSelf: "flex-end" }}>
          {chat.map((data, index) => {
            if (data.type === "notification") {
              return (
                <Notification
                  key={index}
                  screenName={data.screenName}
                  message={data.message}
                  postTime={data.postTime}
                />
              );
            } else {
            }
            return (
              <Message
                type={data.type}
                screenName={data.screenName}
                message={data.message}
                key={index}
                socket={socket}
                messageId={data.messageId}
                reactions={data.reactions}
                editTime={data.editTime}
                postTime={data.postTime}
              />
            );
          })}
        </Container>
      </Row>
    </>
  );
};

export default ChatBox;
