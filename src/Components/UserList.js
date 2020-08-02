import React from "react";

const UserList = ({ users }) => {
  const renderUserList = () => {
    return (
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h3>Users:</h3>
      {renderUserList()}
    </div>
  );
};

export default UserList;
