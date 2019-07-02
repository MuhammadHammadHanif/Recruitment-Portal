const express = require("express");
const passport = require("passport");

// Company Model
const Companies = require("../models/Company");

// Load validation
const validateCompanyProfileInput = require("../validations/companyProfile");
const validateCompanyJobPostingInput = require("../validations/jobPosting");

// Router
const router = express.Router();

// @route  POST companies/profile
// @desc   Create/Edit company profile
// @access Private
router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCompanyProfileInput(req.body);

    // check Authentication
    if (req.user.role !== "Company") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }

    // check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user._id;
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
      instagram,
      annualsales,
      noofemployees,
      partners,
      additionaldescription
    } = req.body;

    companyname && (profileFields.companyname = companyname);
    establishdate && (profileFields.establishdate = establishdate);
    address && (profileFields.address = address);
    phone && (profileFields.phone = phone);
    website && (profileFields.website = website);
    email && (profileFields.email = email);
    annualsales && (profileFields.annualsales = annualsales);
    noofemployees && (profileFields.noofemployees = noofemployees);
    partners && (profileFields.partners = partners);
    additionaldescription &&
      (profileFields.additionaldescription = additionaldescription);

    // Services - Split into array
    if (typeof services !== "undefined") {
      profileFields.services = services.split(",");
    }
    // social
    profileFields.social = {};
    twitter && (profileFields.social.twitter = twitter);
    facebook && (profileFields.social.facebook = facebook);
    linkedin && (profileFields.social.linkedin = linkedin);
    instagram && (profileFields.social.instagram = instagram);

    Companies.findOne({ user: req.user._id })
      .then(profile => {
        if (profile) {
          Companies.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileFields },
            { new: true }
          ).then(profile => {
            return res.status(200).send(profile);
          });
        } else {
          // check if Company Name exists
          Companies.findOne({ companyname: profileFields.companyname }).then(
            companyname => {
              if (companyname) {
                errors.companyname = "Company Name already exists";
                return res.status(400).send(errors);
              }
            }
          );
          // create new proflie
          new Company(profileFields)
            .save()
            .then(profile => res.status(201).send(profile));
        }
      })
      .catch(err => console.log(err));
  }
);

// @route  POST companies/jobposting
// @desc   Add Job posting
// @access Private
router.post(
  "/jobposting",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCompanyJobPostingInput(req.body);

    // check Authentication
    if (req.user.role !== "Company") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }

    // check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }

    Companies.findOne({ user: req.user._id })
      .then(jobPosting => {
        // Get fields
        const jobPostingFields = {};
        jobPostingFields.companyid = req.user._id;
        let {
          jobtitle,
          jobdescription,
          duties,
          skills,
          education,
          experience,
          salary,
          email,
          location,
          postingenddate
        } = req.body;

        jobtitle && (jobPostingFields.jobtitle = jobtitle);
        jobdescription && (jobPostingFields.jobdescription = jobdescription);
        education && (jobPostingFields.education = education);
        experience && (jobPostingFields.experience = experience);
        salary && (jobPostingFields.salary = salary);
        email && (jobPostingFields.email = email);
        location && (jobPostingFields.location = location);
        postingenddate && (jobPostingFields.postingenddate = postingenddate);

        // Duties - Split into array
        if (typeof duties !== "undefined") {
          jobPostingFields.duties = duties.split(",");
        }
        // Skills - Split into array
        if (typeof skills !== "undefined") {
          jobPostingFields.skills = skills.split(",");
        }
        // Add new Job
        jobPosting.jobsposting.unshift(jobPostingFields);
        jobPosting.save().then(jobPosting => res.status(201).send(jobPosting));
      })
      .catch(() => {
        errors.company = "No Company Found";
        return res.status(404).send(company);
      });
  }
);

// @route  GET companies/alljobposting
// @desc   GET Job posting
// @access Private
router.get(
  "/alljobposting",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};

    // check Authentication
    if (req.user.role !== "Company") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }

    Companies.findOne({ user: req.user._id })
      .then(company => {
        // check if company is present
        if (!company) {
          errors.company = "No Company Found";
          return res.status(404).send(company);
        }
        if (company.jobsposting.length === 0) {
          errors.job = "No Job Found";
          return res.status(404).send(errors);
        }

        return res.send(company);
      })
      .catch(() => {
        errors.company = "No Company Found";
        return res.status(404).send(company);
      });
  }
);

module.exports = router;
