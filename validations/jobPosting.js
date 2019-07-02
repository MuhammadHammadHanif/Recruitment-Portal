const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateCompanyJobPostingInput = data => {
  let errors = {};
  let {
    jobtitle,
    jobdescription,
    duties,
    skills,
    education,
    experience,
    email,
    location
  } = data;
  jobtitle = !isEmpty(jobtitle) ? jobtitle : "";
  jobdescription = !isEmpty(jobdescription) ? jobdescription : "";
  duties = !isEmpty(duties) ? duties : "";
  email = !isEmpty(email) ? email : "";
  skills = !isEmpty(skills) ? skills : "";
  education = !isEmpty(education) ? education : "";
  experience = !isEmpty(experience) ? experience : "";
  location = !isEmpty(location) ? location : "";

  // Job Title
  if (validator.isEmpty(jobtitle)) {
    errors.jobtitle = "Job Title Field is required";
  }
  // Job Description
  if (validator.isEmpty(jobdescription)) {
    errors.jobdescription = "Job Description field is required";
  }
  // Email
  if (validator.isEmpty(email)) {
    errors.email = "Email field is required";
  }
  if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  // Location
  if (validator.isEmpty(location)) {
    errors.location = "Location field is required";
  }
  // Duties
  if (validator.isEmpty(duties)) {
    errors.duties = "Duties field is required";
  }
  // skills
  if (validator.isEmpty(skills)) {
    errors.skills = "Skills field is required";
  }
  // Education
  if (validator.isEmpty(education)) {
    errors.education = "Education field is required";
  }
  // Experience
  if (validator.isEmpty(experience)) {
    errors.experience = "Experience field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
