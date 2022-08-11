import room from "../models/room.js";
import hotel from "../models/hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
   const hotelId = req.params.hotelid;
   const newRoom = new room(req.body);

   try {
        const savedRoom = await newRoom.save();
        try {
            await hotel.findByIdAndUpdate(hotelId,{
                $push: {rooms: savedRoom._id},
            });
        }catch(err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    }catch(err) {
        next(err);
    }
}

export const putRoom = async (req,res,next) => {
    try {
        const updateRoom = await room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            {new: true});
        res.status(200).json(updateRoom);
    }catch (err) {
        next(err);
    }
}

export const deleteRoom = async (req,res,next) => {
    const hotelId = req.params.hotelid;
    try {        
        await room.findByIdAndDelete(req.params.id);
        try {
        await hotel.findByIdAndUpdate(hotelId,{
            $pull: {rooms: req.params.id},
        });
        }catch(err) {
            next(err);
        }
        res.status(200).json("delete");
    }catch (err) {
        next(err);
    }
}

export const getRoom = async (req,res,next) => {
    try {
        const Room = await room.findById(req.params.id);
        res.status(200).json(Room);
    }catch (err) {
        next(err);
    }
}

export const getRooms = async (req,res,next) => {
    try {
        const rooms = await room.find();
        res.status(200).json(rooms);
    }catch (err) {
        next(err);
    }
}
