import express from "express";
import { createRoom, putRoom, deleteRoom, getRoom, getRooms} from "../controllers/room.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// post
router.post("/:hotelid", verifyAdmin, createRoom);
// put
router.put("/:id", verifyAdmin, putRoom);
// delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
// get
router.get("/:id", getRoom);
// get all
router.get("/", getRooms);

export default router;