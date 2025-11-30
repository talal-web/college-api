import Event from "../models/Event.js";
import asyncHandler from "express-async-handler";

export const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create({
    title: req.body.title,
    description: req.body.description,
    image: req.file?.filename,
    date: req.body.date,
  });

  res.status(201).json(event);
});

export const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.json(events);
});
