const morgan = require("morgan");

function logger(req, res, next) {
  try {
    let externalMiddlware = morgan("tiny");
    externalMiddlware(req, res, next);
  } catch (error) {
    next(error);
  }
}

module.exports = logger;
