import express from "express";

import * as fileHelper from "../helpers/fileHelper.js";

import users from "../data/users.json" assert { type: "json" };

const router = express.Router();

const filePath = "./data/users.json";

//GET ALL USERS
router.get("/", (req, res) => {
  res.send(users);
});

//ADD USER
router.post("/", (req, res) => {
  const data = req.body;

  try {
    fileHelper.writeToDataFile(filePath, data);

    res.status(200).json({ message: "Data added successfully!" });
  } catch (error) {
    console.error("Error writing to file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
