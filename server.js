require("dotenv").config({
	path: "./variables.env"
});

const path = require("path");
const express = require("express");
const routes = require("./routes");

const app = express();
// Connect to database

// View Engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

// Routes
app.use("/", routes);

// Port
app.set("port", process.env.PORT || 80);
// Server
app.listen(app.get("port"), () => {
	console.log(`Listening on port ${app.get("port")}`);
});
