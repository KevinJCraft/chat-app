import React from "react";

const UserList = ({ users }) => {
  return (
    <div>
      <h3>Users:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{`${user.screenName} ${
            user.isTyping ? "is typing" : ""
          }`}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
