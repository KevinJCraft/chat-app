import React from "react";
import { ListGroup } from "react-bootstrap";

const UserListMobile = ({ users }) => {
  return (
    <ListGroup>
      {users.map((user, index) => (
        <ListGroup.Item className="border-0" key={index}>
          {user.screenName}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UserListMobile;
