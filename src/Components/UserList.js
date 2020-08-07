import React from "react";
import { Row, Container } from "react-bootstrap";

const UserList = ({ users }) => {
  return (
    <Row className="flex-grow-0">
      <Container>
        <h3>Users:</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{`${user.screenName} ${
              user.isTyping ? "is typing" : ""
            }`}</li>
          ))}
        </ul>
      </Container>
    </Row>
  );
};

export default UserList;
