import { Router } from "express";
import { create, getAll, getById, update, remove } from "../controllers/student.controller";
import verifyToken from "../middleware/verifyToken";
import authorizeRole from "../middleware/authorizeRole";

const router = Router();

router.post("/", verifyToken, authorizeRole("admin"), create);
router.get("/", verifyToken, authorizeRole("admin"), getAll);
router.get("/:id", verifyToken, authorizeRole("admin"), getById);
router.put("/:id", verifyToken, authorizeRole("admin"), update);
router.delete("/:id", verifyToken, authorizeRole("admin"), remove);

export default router;
