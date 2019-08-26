const path = require("path");

// Environment Variables
require("dotenv").config({
	path: path.resolve(__dirname, "../../", "./variables.env")
});

// Imports
const mongoose = require("mongoose");
const express = require("express");
const serveFavicon = require("serve-favicon");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const passport = require("passport");
const routes = require("./routes");
const getManifest = require("./middlewares/getManifest.js");
const errorHandler = require("./middlewares/errorHandler.js");
const app = express();

// Constants
const PUBDIR = path.resolve(__dirname, "../../", "./public/");

// Database
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true
});
const {connection: db} = mongoose;

// Models
require("./models/User.js");
require("./models/Post.js");
require("./models/Like.js");
require("./models/Follow.js");

// Sessions
const maxAge = 1000 * 60 * 60 * 24 * 30 * 3; // 3 Months
app.use(session({
	name: "session",
	cookie: {
		maxAge
	},
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({
		mongooseConnection: db
	}),
	maxAge
}));

// Authentication
const userModel = mongoose.model("User");
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

// Static Files
app.use(express.static(PUBDIR));

// Favicon
app.use(serveFavicon(path.join(PUBDIR, "./images/logo/", "./favicon.ico")));

// Body Parser
app.use(bodyParser.json({
	limit: "10mb"
}));
app.use(bodyParser.urlencoded({
	extended: true
}));

// View Engine
app.set("views", path.join(__dirname, "/views/"));
app.set("view engine", "pug");

// Hashed File Names
app.use(getManifest());

// Routes
app.use("/", routes());

// Error Handling
app.use(errorHandler);

// Port
app.set("port", process.env.PORT || 80);

// Server
db.on("error", (err) => {
	console.error(`ERROR Database Connection: ${err}`);
});
db.on("open", () => {
	app.listen(app.get("port"), () => console.log(`SERVER Listening on port ${app.get("port")}.`));
});
