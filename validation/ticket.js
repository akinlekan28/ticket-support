const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTicketInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.userId = !isEmpty(data.userId) ? data.userId : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (validator.isEmpty(data.userId)) {
    errors.userId = "UserId is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
