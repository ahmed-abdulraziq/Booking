import express from "express";
import { putUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// put
router.put("/:id", verifyUser, putUser);
// delete
router.delete("/:id", verifyUser, deleteUser);
// get
router.get("/:id", verifyUser, getUser);
// get all
router.get("/", verifyAdmin, getUsers);

export default router;