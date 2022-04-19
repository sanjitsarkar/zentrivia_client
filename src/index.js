const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectMongo = require("./config/index.js");
const {
  authRoutes,
  categoryRoutes,
  quizRoutes,
  questionRoutes,
  userRoutes,
} = require("./api/routes");
const { auth } = require("./api/middlewares/");
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://zentriviax.netlify.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
const PORT = process.env.PORT || 5000;

connectMongo(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/user", userRoutes);
app.get("/welcome", auth, (req, res) => {
  res.send("Welcome ", req.user.id);
});
app.get("/", (_, res) => {
  res.send("Welcome to ZenTrivia");
});
