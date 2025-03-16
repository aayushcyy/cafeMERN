import express from "express";
import { Availability } from "../models/Availability.models.js";

const slotsAvailable = async (req, res) => {
  console.log(req.body);
  const { date, branch } = req.body;
  if (!date || !branch)
    return res.status(400).json({ msg: "pleage give date and branch" });

  try {
    const checkAvailability = await Availability.findOne({
      date: date.toLowerCase(),
      branch: branch,
    });

    if (!checkAvailability) {
      const newAvailabilityDoc = new Availability({
        _id: `${branch}-${date.toLowerCase()}`,
        branch: branch,
        date: date.toLowerCase(),
        slots: [
          {
            time: "10AM - 11AM",
            isBooked: true,
          },
          {
            time: "11AM - 12PM",
            isBooked: true,
          },
          {
            time: "12PM - 1PM",
            isBooked: true,
          },
          {
            time: "1PM - 2PM",
            isBooked: true,
          },
          {
            time: "2PM - 3PM",
            isBooked: true,
          },
          {
            time: "3PM - 4PM",
            isBooked: true,
          },
          {
            time: "4PM - 5PM",
            isBooked: true,
          },
          {
            time: "5PM - 6PM",
            isBooked: true,
          },
          {
            time: "6PM - 7PM",
            isBooked: true,
          },
          {
            time: "7PM - 8PM",
            isBooked: true,
          },
          {
            time: "8PM - 9PM",
            isBooked: true,
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
