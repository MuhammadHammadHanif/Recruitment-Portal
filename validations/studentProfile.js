const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateStudentProfileInput = data => {
  let errors = {};
  let {
    name,
    fathername,
    gender,
    nationality,
    dateofbirth,
    address,
    phone,
    email,
    cnic,
    country,
    city,
    maritalstatus,
    skills,
    linkedin,
    github
  } = data;
  name = !isEmpty(name) ? name : "";
  fathername = !isEmpty(fathername) ? fathername : "";
  address = !isEmpty(address) ? address : "";
  phone = !isEmpty(phone) ? phone : "";
  email = !isEmpty(email) ? email : "";
  gender = !isEmpty(gender) ? gender : "";
  nationality = !isEmpty(nationality) ? nationality : "";
  dateofbirth = !isEmpty(dateofbirth) ? dateofbirth : "";
  cnic = !isEmpty(cnic) ? cnic : "";
  country = !isEmpty(country) ? country : "";
  city = !isEmpty(city) ? city : "";
  maritalstatus = !isEmpty(maritalstatus) ? maritalstatus : "";
  skills = !isEmpty(skills) ? skills : "";

  // Name
  if (!validator.isLength(name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 or 30 characters";
  }
  if (validator.isEmpty(name)) {
    errors.name = "Name Field is required";
  }
  // Father Name
  if (!validator.isLength(fathername, { min: 3, max: 30 })) {
    errors.fathername = "Father Name must be between 3 or 30 characters";
  }
  if (validator.isEmpty(fathername)) {
    errors.fathername = "Father Name field is required";
  }
  // CNIC
  if (!validator.isLength(cnic, { min: 13, max: 13 })) {
    errors.cnic = "Name must be 13 characters";
  }
  if (validator.isEmpty(cnic)) {
    errors.cnic = "CNIC field is required";
  }
  // Country
  if (validator.isEmpty(country)) {
    errors.country = "Country field is required";
  }
  // City
  if (validator.isEmpty(city)) {
    errors.city = "City field is required";
  }
  // Martial Status
  if (validator.isEmpty(maritalstatus)) {
    errors.maritalstatus = "Martial Status field is required";
  }
  // Skills
  if (validator.isEmpty(skills)) {
    errors.skills = "Skills field is required";
  }
  // Gender
  if (validator.isEmpty(gender)) {
    errors.gender = "Gender field is required";
  }
  // Nationality
  if (validator.isEmpty(nationality)) {
    errors.nationality = "Nationality field is required";
  }
  // Date of Birth
  if (validator.isEmpty(dateofbirth)) {
    errors.dateofbirth = "Date of Birth field is required";
  }
  // Email
  if (validator.isEmpty(email)) {
    errors.email = "Email field is required";
  }
  if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  // Address
  if (validator.isEmpty(address)) {
    errors.address = "Address field is required";
  }
  // Phone
  if (validator.isEmpty(phone)) {
    errors.phone = "Phone Number field is required";
  }
  // linkedin
  if (!isEmpty(linkedin)) {
    if (!validator.isURL(linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }
  // Github
  if (!isEmpty(github)) {
    if (!validator.isURL(github)) {
      errors.github = "Not a valid URL";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
