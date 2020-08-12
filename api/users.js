const users = [];

const userJoin = (id, screenName) => {
  const user = { id, screenName, isTyping: false };

  users.push(user);
};

const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

const userLeave = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users.splice(index, 1);
  }
};

const getUserList = () => {
  return users;
};

module.exports = { userJoin, getCurrentUser, userLeave, getUserList };
