const express = require("express");
const { getMessage } = require("../controllers/message.controller");

const router = express.Router();

router.get("/massage", getMessage);

module.exports = router;
