const { getSingleUser } = require("../services/user.service");

async function getUser(req, res, next) {
  try {
    const user = await getSingleUser();

    res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUser,
};
