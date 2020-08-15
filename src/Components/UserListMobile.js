import React from "react";
import { ListGroup } from "react-bootstrap";

const UserListMobile = ({ users }) => {
  return (
    <ListGroup>
      {users.map((user, index) => (
        <ListGroup.Item
          className="white-background white-text border-0"
          key={index}
        >
          {user.screenName}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UserListMobile;
