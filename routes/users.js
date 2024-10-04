import express from "express";

import * as fh from "../helpers/fileHelpers.js";
import * as uh from "../helpers/usersHelpers.js";

const filePath = "./data/users.json";

const router = express.Router();

//GET PATHS
//GET ALL USERS
router.get("/", (req, res) => {
  const users = uh.getUsers();
  res.send(users);
});

//GET SINGLE USER
router.get("/user", (req, res) => {
  const queryParams = req.query;
  const user = uh.getUser(queryParams);
  res.send(user);
});

//POST PATHS
//ADD USER
router.post("/", (req, res) => {
  const data = req.body;

  try {
    fh.writeToDataFile(filePath, data);

    res.status(200).json({ message: "Data added successfully!" });
  } catch (error) {
    console.error("Error writing to file:", error);

    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
