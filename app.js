import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
