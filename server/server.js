const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const empRoutes = require("./routes/employeeRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/emp", empRoutes);

// connecting to mongoose DB
const DatabaseConnected = () => console.log("DB connected successfully");
const DatabaseNotConnected = (err) =>
  console.log("DB didn't connect with error:", err);

mongoose
  .connect(process.env.DB_URL, {
    // useNewUrlParser: true,
  })
  .then(DatabaseConnected)
  .catch(DatabaseNotConnected);

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// starting the server
const serverIsStarted = (PORT) => console.log("Sever started on port:", PORT);

app.listen(process.env.PORT || 4000, () =>
  serverIsStarted(process.env.PORT || 4000)
);
