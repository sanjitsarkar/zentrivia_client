const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectMongo = require("./config/index.js");
const { authRoutes, userRoutes, reminderRoutes } = require("./api/routes");
const { auth } = require("./api/middlewares/");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

connectMongo(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/reminders", auth, reminderRoutes);
app.use("/api/users", auth, userRoutes);

app.get("/", (_, res) => {
  res.send("Welcome to Reminderly");
});
