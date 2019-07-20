const mongoose = require("mongoose");

// Ensure the validity of the given supposed MongoDB ObjectId
module.exports = (id) => mongoose.Types.ObjectId.isValid(id);
