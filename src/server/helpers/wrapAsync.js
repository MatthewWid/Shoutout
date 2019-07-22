// Generic error handler for async functions
module.exports = (func) => (req, res, next) => func(req, res, next).catch(next);
