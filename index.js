const express = require("express");
const Sequelize = require("sequelize");
const userRouter = require("./routes/user.route");
const studentRouter = require("./routes/student.route");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to jwt" });
});
app.use("/api", userRouter);
app.use("/api", studentRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server is running");
});
