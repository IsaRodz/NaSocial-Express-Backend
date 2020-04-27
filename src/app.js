const express = require("express");
const cors = require("cors");
const app = express();

const path = require("path");

// Settings
app.set("port", process.env.PORT || 5000);

//Middlewares
app.use(cors());
app.use(express.json());

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));

module.exports = app;
