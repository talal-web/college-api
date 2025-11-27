import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  const event = await Event.create({
    title: req.body.title,
    description: req.body.description,
    image: req.file?.filename,
    date: req.body.date
  });

  res.json(event);
};

export const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};
