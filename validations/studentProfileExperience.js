const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateStudentProfileExperienceInput = data => {
  let errors = {};
  let { title, company, from } = data;
  company = !isEmpty(company) ? company : "";
  title = !isEmpty(title) ? title : "";
  from = !isEmpty(from) ? from : "";

  if (validator.isEmpty(title)) {
    errors.title = "Job title field is required";
  }

  if (validator.isEmpty(company)) {
    errors.company = "Company field is required";
  }

  if (validator.isEmpty(from)) {
    errors.from = "From date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
