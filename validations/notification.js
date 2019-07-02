const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateNotificationInput = data => {
  let errors = {};
  let { message } = data;
  message = !isEmpty(message) ? message : "";

  // message
  if (!validator.isLength(message, { min: 1 })) {
    errors.message = "Message must be greater than 1 characters";
  }
  if (validator.isEmpty(message)) {
    errors.message = "Message field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
