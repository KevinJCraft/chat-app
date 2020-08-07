import React from "react";
import { Row, Container } from "react-bootstrap";

const UserList = ({ users }) => {
  return (
    <Row className="flex-grow-0">
      <Container>
        {users.map((user, index) => (
          <li key={index}>{`${user.screenName} ${
            user.isTyping ? "is typing" : ""
          }`}</li>
        ))}
      </Container>
    </Row>
  );
};

export default UserList;
