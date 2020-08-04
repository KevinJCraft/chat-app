const emojis = ["👍", "👎", "😊", "🥺", "😉", "😍", "😜", "😂", "😢"];

const getReactionObject = () => {
  const object = emojis.reduce((object, emoji) => {
    object[emoji] = [];
    return object;
  }, {});

  return object;
};
module.exports = { getReactionObject };
