import express from "express";
import { Availability } from "../models/Availability.models.js";

const slotsAvailable = async (req, res) => {
  const { date, branch } = req.body;
  if (!date || !branch)
    return res.status(400).json({ msg: "pleage give date and branch" });

  try {
    const checkAvailability = await Availability.findOne({
      date: date,
      branch: branch,
    });

    if (!checkAvailability) {
      const newAvailabilityDoc = new Availability({
        _id: `${branch}-${date}`,
        branch: branch,
        date: date,
        slots: [
          {
            time: "10AM - 11AM",
            isBooked: false,
          },
          {
            time: "11AM - 12PM",
            isBooked: false,
          },
          {
            time: "12PM - 1PM",
            isBooked: false,
          },
          {
            time: "1PM - 2PM",
            isBooked: false,
          },
          {
            time: "2PM - 3PM",
            isBooked: false,
          },
          {
            time: "3PM - 4PM",
            isBooked: false,
          },
          {
            time: "4PM - 5PM",
            isBooked: false,
          },
          {
            time: "5PM - 6PM",
            isBooked: false,
          },
          {
            time: "6PM - 7PM",
            isBooked: false,
          },
          {
            time: "7PM - 8PM",
            isBooked: false,
          },
          {
            time: "8PM - 9PM",
            isBooked: false,
          },
        ],
      });

      const saveDoc = await newAvailabilityDoc.save();

      return res
        .status(201)
        .json({ msg: "doc created successful!", newDoc: saveDoc });
    }

    res.status(200).json({ msg: "Document found", doc: checkAvailability });
  } catch (error) {
    res.status(500).json({ msg: "error finding the doc", error: error });
  }
};

export { slotsAvailable };
