require("dotenv").config({
	path: "./variables.env"
});

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");
const app = express();

// Database
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true
});
const {connection: db} = mongoose;

// Models
require("./models/Post");

// View Engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

// Routes
app.use("/", routes);

// Port
app.set("port", process.env.PORT || 80);

// Connect to database and start server
db.on("error", (err) => {
	console.error(`ERROR Database Connection: ${err}`);
});
db.on("open", () => {
	app.listen(app.get("port"), () => console.log(`SERVER Listening on port ${app.get("port")}.`));
});
