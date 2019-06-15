// Environment Variables
require("dotenv").config({
	path: "./variables.env"
});

// Imports
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const getManifest = require("./middlewares/getManifest.js");
const routes = require("./routes");
const app = express();

// Database
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true
});
const {connection: db} = mongoose;

// Models
require("./models/Post");

// Static Files
app.use(express.static(path.join(__dirname, "..", "./public/")));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// View Engine
app.set("views", path.join(__dirname, "/views/"));
app.set("view engine", "pug");

// Hashed File Names
app.use(getManifest());

// Routes
app.use("/", routes);

// Port
app.set("port", process.env.PORT || 80);

// Server
db.on("error", (err) => {
	console.error(`ERROR Database Connection: ${err}`);
});
db.on("open", () => {
	app.listen(app.get("port"), () => console.log(`SERVER Listening on port ${app.get("port")}.`));
});
