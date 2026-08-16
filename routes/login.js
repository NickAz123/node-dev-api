import express from "express";

import * as fh from "../helpers/fileHelpers.js";
import * as lh from "../helpers/loginHelpers.js";

const router = express.Router();

// app.post("/", (req, res) => {
//     const { email, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ error: "Email and Password required!" });
//     }

//     //authenticate user exists
//     const user = lh.findUserByEmailAndPassword(email, password);

//     if (!user) {
//         return res.status(400).json({ error: "User not found!" });
//     }

//     req.session.userId = user.id;
//     res.send("Logged in successfully!");
// });

// // Dashboard Route: Reads live user state automatically populated from Redis
// app.get('/dashboard', (req, res) => {
//   if (!req.session.userId) {
//     return res.status(401).send('Unauthorized access');
//   }
//   res.send(`Welcome back user ${req.session.userId}`);
// });

// // Logout Route: Clears data from Redis and deletes the client cookie
// app.post('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) return res.status(500).send('Could not log out');
//     res.clearCookie('connect.sid'); // Clears default cookie name
//     res.send('Logged out successfully');
//   });
// });
