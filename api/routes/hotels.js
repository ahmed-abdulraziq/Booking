import express from "express";
import { postHotel, putHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms} from "../controllers/hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// post
router.post("/", verifyAdmin, postHotel);
// put
router.put("/:id", verifyAdmin, putHotel);
// delete
router.delete("/:id", verifyAdmin, deleteHotel);
// get
router.get("/find/:id", getHotel);
// get all
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;