import express from "express";
import session from "express-session";

import { createClient } from "redis";
import { RedisStore } from "connect-redis";

import bodyParser from "body-parser";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

const redisClient = createClient({
  url: `redis://localhost:${PORT}`,
});

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:session:",
  ttl: 86400,
});

app.use(
  session({
    store: redisStore,
    secret: process.env.SECRET_KEY, // Used to sign the session ID cookie
    resave: false, // Prevents resaving unchanged sessions
    saveUninitialized: false, // Avoids creating blank sessions for guests
    cookie: {
      httpOnly: true, // Prevents XSS attacks from reading cookie data
      secure: false, // Set to true in production (requires HTTPS)
      maxAge: 1000 * 60 * 60 * 24, // Cookie lifetime matching Redis TTL (1 day)
    },
  }),
);

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
