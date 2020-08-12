import React, { useState } from "react";
import emoji from "react-easy-emoji";
import {
  Row,
  Col,
  Popover,
  OverlayTrigger,
  Button,
  Badge,
} from "react-bootstrap";
import { PlusIcon } from "@primer/octicons-react";
const Message = ({
  reactions,
  messageId,
  message,
  screenName,
  type,
  socket,
  editTime,
  postTime,
}) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleSetReaction = (emoji) => {
    socket.emit("addReaction", {
      messageId,
      emoji,
      userId: socket.id,
    });
    setShowEmojis(false);
  };

  const handleEdit = () => {
    setIsInEditMode(!isInEditMode);
  };

  const getEmojis = () => {
    return Object.keys(reactions);
  };

  const renderEmojiPicker = () => {
    return (
      <OverlayTrigger
        show={showEmojis}
        placement="right"
        overlay={
          <Popover id={`popover-positioned-right`}>
            <Popover.Content className="white-background">
              {getEmojis().map((emoji, index) => (
                <span
                  style={{ fontSize: "20px" }}
                  className="mr-1"
                  key={index}
                  onClick={() => handleSetReaction(emoji)}
                >
                  {emoji}
                </span>
              ))}
            </Popover.Content>
          </Popover>
        }
      >
        <Button
          onClick={() => setShowEmojis(!showEmojis)}
          style={{
            bottom: "-10px",
            left: "-10px",
            height: "20px",
            width: "20px",
            fontSize: "8px",
          }}
          className="primary-background m-0 p-0 rounded-circle position-absolute border border-white"
        >
          <PlusIcon size={8} />
        </Button>
      </OverlayTrigger>
    );
  };
  const displayReactions = () => {
    let reactionsArr = [];
    if (type === "message" || type === "ownMessage") {
      Object.entries(reactions).forEach((arr, index) => {
        if (arr[1].length > 0) {
          reactionsArr.push(
            <Badge
              className="secondary-background mr-1"
              key={index}
              pill
              variant="info"
            >
              {arr[0]}x{arr[1].length}
            </Badge>
          );
        }
      });
    }
    return reactionsArr;
  };
  const getMessageSpacing = () => {
    if (type === "ownMessage") {
      return { span: 8, offset: 3 };
    } else {
      return { span: 8, offset: 1 };
    }
  };

  return (
    <>
      <Row className="align-bottom w-90 mxauto my-3">
        <Col
          xs={getMessageSpacing()}
          className="text-white primary-background rounded p-2 position-relative"
        >
          {type !== "ownMessage" && renderEmojiPicker()}
          <div className="text-break text-wrap font-weight-bold">{message}</div>
          <Row>
            <Col>{displayReactions()}</Col>
          </Row>
          <div
            style={{ opacity: "0.5" }}
            className="text-wrap small d-flex justify-content-between"
          >
            <span>{type === "message" ? screenName : "You"}</span>
            <span>{editTime || postTime}</span>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Message;
