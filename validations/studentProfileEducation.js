const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateStudentProfileEducationInput = data => {
  let errors = {};
  let { school, degree, from, fieldofstudy, grade } = data;
  degree = !isEmpty(degree) ? degree : "";
  school = !isEmpty(school) ? school : "";
  from = !isEmpty(from) ? from : "";
  grade = !isEmpty(grade) ? grade : "";
  fieldofstudy = !isEmpty(fieldofstudy) ? fieldofstudy : "";

  // School
  if (validator.isEmpty(school)) {
    errors.school = "School field is required";
  }
  // Degree
  if (validator.isEmpty(degree)) {
    errors.degree = "Degree field is required";
  }
  // From date
  if (validator.isEmpty(from)) {
    errors.from = "From date is required";
  }
  // Grade
  if (validator.isEmpty(grade)) {
    errors.grade = "Grade Field is required";
  }
  // Field of Study
  if (validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = "Field Of Study Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
