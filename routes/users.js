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
router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const user = uh.getUser(userId);
  res.send(user);
});

//POST PATHS
//ADD USER
router.put("/", async (req, res) => {
  var data = req.body;
  data = await uh.hashPassword(data);

  try {
    fh.addToDataFile(filePath, data);

    res.status(200).json({ message: "Data added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" + error });
  }
});

//UPDATE USER
router.patch("/update", (req, res) => {
  const data = req.body;
  const updatedUsers = uh.updateUsers(data);

  res.send(updatedUsers);
});

//UPDATE PASSWORD
router.patch("/:id/update-password", (req, res) => {
  const data = req.body;
  const userId = req.params.id;

  const user = uh.getUser(userId);
  
  // if(user){
  //   try {
  //     const updatedUser = uh.updateUserPassword(user, data);

  //   }
  // }
});

//DELETE USERS
router.delete("/delete", (req, res) => {
  const idArray = req.body.ids;

  try {
    uh.deleteUsers(idArray);
    res.status(200).json({ message: "Data deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
