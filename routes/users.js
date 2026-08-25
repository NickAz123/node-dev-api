import express from "express";
const router = express.Router();

import * as bh from "../helpers/bcryptHelpers.js"
import * as uModels from "../models/userModels.js"; 

router.get("/", async (req, res) => {
    try{
        const users = await uModels.getAllUsers();
        res.status(200).json(users);
    } catch (err){
        console.log(err);
        res.status(500).json({error: 'Failed to fetch all users'});
    }
});

//GET SINGLE USER
router.get("/:id", async (req, res) => {
    try{
        const user = await uModels.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (err){
        console.log(err);
        res.status(500).json({error: 'Failed to fetch user'});
    }
});

//POST PATHS
//ADD USER
router.put("/", async (req, res) => {
    const {firstName, lastName, userName, password, email } = req.body;

    if(!firstName || !lastName || !userName || !password || !email){
        res.status(400).json({message: "All fields required." });
    }

    const passwordHash = await bh.hashPassword(password);

    try {
        const userId = await uModels.addUser(firstName, lastName, userName, passwordHash ,email);

        res.status(200).json({ added: userId });
        } catch (err) {
        // psql error code for unique_validation failure on unique constraints
            if (err.code === '23505') {
                return res.status(409).json({ error: 'Email or username already exists' });
            }

            console.log(err);
            res.status(500).json({ message: "Internal server error: " + err });
    }
});

//UPDATE USER
router.patch("/:id", async (req, res) => {
    try{
        const updatedUser = await uModels.updateUser(req.params.id, req.body);

        if(!updatedUser){
            return res.status(400).json({error: 'No valid fields present'});
        }

        res.status(200).json(updatedUser)
    } catch (err){
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Email or username already exists' });
        }

        console.error(err);
        res.status(500).json({error:'Failed to update user'})
    }
});

//UPDATE PASSWORD
router.patch("/:id/update-password", async (req, res) => {
    const data = req.body;
    const userId = req.params.id;
    const user = await uModels.getUserById(userId);

    if (await bh.comparePassword(user.password, data.currentPassword)) {
        user.password = await bh.hashPassword(data.newPassword);

        try {
            const updatedUser = await uModels.updateUser(userId, user);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: "Could not update user password" });
        }
    } else {
        res.status(500).json({ message: "Password Mismatch" });
    }
});

//DELETE USER
router.delete ("/delete/:id", async (req, res) => {
    try {
        const deletedId = await uModels.softDeleteUser(req.params.id);
        res.status(200).json({ deleted: deletedId});
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Ineternal Server Error: " + err });
    }
});

export default router;
