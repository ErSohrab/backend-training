const messageData = require("../models/message.model");

function getWelcomeMessage() {
  return messageData;
}

module.exports = {
  getWelcomeMessage,
};
