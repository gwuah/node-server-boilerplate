const mongoose = require("mongoose");

exports.validate = function(queue) {
  const errors = [];
  const response = [];
  const validationQueue = queue;

  for (const validation of validationQueue) {
    const { error, value } = validation;
    if (error) {
      errors.push(error.message);
    } else {
      response.push(value);
    }
  }

  if (errors.length > 0) {
    return {
      error: true,
      response: errorBus
    };
  }

  return {
    error: false,
    response: response
  };
};

exports.connectToDatabase = function(url) {
  return new Promise((res, rej) => {
    mongoose
      .connect(url, { useNewUrlParser: true })
      .then(() => {
        console.log(`[Connected To Database ${url}]`);
        res(url);
      })
      .catch(err => {
        console.log("[Connextion to database failed 💔]", err);
        rej(err);
      });
  });
};

exports.errorHandler = function() {
  return function(error, req, res, next) {
    let message = "";

    console.log(error);
    if (error.name === "UnauthorizedError") {
      return res.status(400).json({
        message: "INVALID TOKEN"
      });
    } else if (error.name == "Input Validation Error") {
      return res.status(400).json({
        validationErrors: error.errors,
        message: "Input Validation Failed"
      });
    } else if (error.name === "CastError") {
      message = "Please provide a valid ObjectID";
    } else if (error.name === "ValidationError") {
      message = error.message;
    } else if (error.code === 11000) {
      message = "The resource already exists";
    } else {
      console.log(error);
      return res.status(500).json({
        message: "Request failed."
      });
    }

    return res.status(400).json({
      message: message
    });
  };
};
