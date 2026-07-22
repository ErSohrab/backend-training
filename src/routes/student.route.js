const express = require("express");
const router = express.Router();
const { create, getAll, getById, update, remove } = require("../controllers/student.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, create);
router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getById);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, remove);

module.exports = router;
