const express = require("express");
const authorizeRole = require("../middleware/authorizeRole");
const router = express.Router();
const { create, getAll, getById, update, remove } = require("../controllers/student.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, authorizeRole("admin"), create);
router.get("/", verifyToken, authorizeRole("admin"), getAll);
router.get("/:id", verifyToken, authorizeRole("admin"), getById);
router.put("/:id", verifyToken, authorizeRole("admin"), update);
router.delete("/:id", verifyToken, authorizeRole("admin"), remove);

module.exports = router;
