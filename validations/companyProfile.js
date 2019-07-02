const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateCompanyProfileInput = data => {
  let errors = {};
  let {
    companyname,
    establishdate,
    address,
    phone,
    website,
    email,
    services,
    twitter,
    linkedin,
    facebook,
    instagram
  } = data;
  companyname = !isEmpty(companyname) ? companyname : "";
  establishdate = !isEmpty(establishdate) ? establishdate : "";
  address = !isEmpty(address) ? address : "";
  phone = !isEmpty(phone) ? phone : "";
  email = !isEmpty(email) ? email : "";
  services = !isEmpty(services) ? services : "";

  // Company Name
  if (!validator.isLength(companyname, { min: 3, max: 40 })) {
    errors.companyname = "Name must be between 3 or 40 characters";
  }
  if (validator.isEmpty(companyname)) {
    errors.companyname = "Company Name Field is required";
  }
  // Established Date
  if (validator.isEmpty(establishdate)) {
    errors.establishdate = "Established Date field is required";
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
  // Services
  if (validator.isEmpty(services)) {
    errors.services = "Services field is required";
  }
  // website
  if (!isEmpty(website)) {
    if (!validator.isURL(website)) {
      errors.website = "Not a valid URL";
    }
  }
  // Twitter
  if (!isEmpty(twitter)) {
    if (!validator.isURL(twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  // facebook
  if (!isEmpty(facebook)) {
    if (!validator.isURL(facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  // linkedin
  if (!isEmpty(linkedin)) {
    if (!validator.isURL(linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }
  // instagram
  if (!isEmpty(instagram)) {
    if (!validator.isURL(instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
