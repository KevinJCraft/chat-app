import React from "react";
import { Row, Col } from "react-bootstrap";

const Notification = ({ screenName, message, postTime }) => {
  return (
    <Row className="black-text font-weight-lighter font-italic text-center my-2">
      <Col xs={{ span: 10, offset: 1 }}>
        {screenName} {message} at {postTime}
      </Col>
    </Row>
  );
};

export default Notification;
