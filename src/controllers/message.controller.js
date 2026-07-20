const { getWelcomeMessage } = require("../services/message.service");

function getMessage(req, res, next) {
  try {
    const message = getWelcomeMessage();

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMessage,
};
