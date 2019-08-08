const {FORBIDDEN_NAMES} = require("./constants.js");

module.exports = (name) => !FORBIDDEN_NAMES.includes(name.toLowerCase());
