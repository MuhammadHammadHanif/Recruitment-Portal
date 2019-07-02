const express = require("express");
const passport = require("passport");

const isEmpty = require("../validations/isEmpty");

// Student model
const Students = require("../models/Student");
const Companies = require("../models/Company");

// Load validation
const validateStudentProfileInput = require("../validations/studentProfile");
const validateStudentProfileExperienceInput = require("../validations/studentProfileExperience");
const validateStudentProfileEducationInput = require("../validations/studentProfileEducation");

// Router
const router = express.Router();

// @route  POST students/profile
// @desc   Create/Edit students profile
// @access Private
router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStudentProfileInput(req.body);

    // check Authentication
    if (req.user.role !== "Student") {
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
      github,
      bio,
      certificates
    } = req.body;

    name && (profileFields.name = name);
    fathername && (profileFields.fathername = fathername);
    address && (profileFields.address = address);
    phone && (profileFields.phone = phone);
    gender && (profileFields.gender = gender);
    email && (profileFields.email = email);
    dateofbirth && (profileFields.dateofbirth = dateofbirth);
    cnic && (profileFields.cnic = cnic);
    country && (profileFields.country = country);
    city && (profileFields.city = city);
    maritalstatus && (profileFields.maritalstatus = maritalstatus);
    bio && (profileFields.bio = bio);
    country && (profileFields.country = country);

    // Certificates - Split into array
    if (typeof certificates !== "undefined") {
      profileFields.certificates = certificates.split(",");
    }
    // Skills - Split into array
    if (typeof skills !== "undefined") {
      profileFields.skills = skills.split(",");
    }
    // Nationality - Split into array
    if (typeof nationality !== "undefined") {
      profileFields.nationality = nationality.split(",");
    }
    // social
    profileFields.social = {};
    linkedin && (profileFields.social.linkedin = linkedin);
    github && (profileFields.social.github = github);

    Students.findOne({ user: req.user._id })
      .then(profile => {
        if (profile) {
          Students.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileFields },
            { new: true }
          ).then(profile => {
            return res.status(200).send(profile);
          });
        } else {
          // check if CNIC exists
          Students.findOne({ cnic: profileFields.cnic }).then(cnicnumber => {
            if (cnicnumber) {
              errors.cnic = "CNIC number already exists";
              return res.status(400).send(errors);
            }
          });
          // create new proflie
          new Students(profileFields)
            .save()
            .then(profile => res.status(201).send(profile));
        }
      })
      .catch(err => console.log(err));
  }
);

// @route  POST students/experience
// @desc   Add experience to profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStudentProfileExperienceInput(req.body);

    // check Authentication
    if (req.user.role !== "Student") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }

    // check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }
    // fields
    let { title, company, location, from, to, current, description } = req.body;
    // new expr object
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    Students.updateOne(
      { user: req.user._id },
      { $push: { experience: newExp } }
    )
      .then(profile => {
        res.status(200).send(profile);
      })
      .catch(() => {
        errors.title = "No Experience Data Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  POST students/education
// @desc   Add education to profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStudentProfileEducationInput(req.body);

    // check Authentication
    if (req.user.role !== "Student") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }

    // check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }
    // fields
    let {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      grade
    } = req.body;
    // new education object
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      grade
    };
    Students.updateOne({ user: req.user._id }, { $push: { education: newEdu } })
      .then(profile => {
        res.status(200).send(profile);
      })
      .catch(() => {
        errors.school = "No Education Data Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  DELETE students/experience/:id
// @desc   Delete experience from profile
// @access Private
router.delete(
  "/experience/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    // check Authentication
    if (req.user.role !== "Student") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }
    Students.updateOne(
      { user: req.user._id },
      { $pull: { experience: { _id: req.params.id } } }
    )
      .then(job => res.status(200).send(job))
      .catch(() => {
        errors.job = "No Expeience Data Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  DELETE students/education/:id
// @desc   Delete education from profile
// @access Private
router.delete(
  "/education/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    // check Authentication
    if (req.user.role !== "Student") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }
    Students.updateOne(
      { user: req.user._id },
      { $pull: { education: { _id: req.params.id } } }
    )
      .then(job => res.status(200).send(job))
      .catch(() => {
        errors.job = "No Education Data Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  POST students/applyjob/:c_id/:j_id
// @desc   Apply for job
// @access Private
router.post(
  "/applyjob/:c_id/:j_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    // check Authentication
    if (req.user.role !== "Student") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }
    // check company for job
    Companies.findOne({ user: req.params.c_id })
      .then(company => {
        // check if student has already applied for job
        let appliedJob =
          company.jobsposting.flatMap(data =>
            data.jobapplied.filter(
              apply =>
                apply.user.toString() === req.user._id.toString() &&
                apply.jobid.toString() === req.params.j_id.toString()
            )
          ).length > 0;

        // if already applied then show error
        if (appliedJob) {
          errors.job = "You have already applied for this job";
          return res.status(400).send(errors);
        }
        // create user ID and job ID  object to add into jobsapplied array
        const newJobApply = {
          user: req.user._id,
          jobid: req.params.j_id
        };
        // filtering job post by id and adding object
        company.jobsposting
          .filter(
            apply => apply._id.toString() === req.params.j_id.toString()
          )[0]
          .jobapplied.unshift(newJobApply);
        company.save().then(company => res.send(company));
      })
      .catch(() => {
        errors.job = "No Company Data Found";
        return res.status(400).send(errors);
      });
  }
);

// @route  GET students/allapplyjobsbystudent
// @desc   Get all applied jobs for student
// @access Private
router.get(
  "/allapplyjobsbystudent",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    // check Authentication
    if (req.user.role !== "Student") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }
    // check company for job
    Companies.aggregate([
      //De-normalized the nested array of jobsposting
      { $unwind: "$jobsposting" },
      //De-normalized the nested array of jobapplied
      { $unwind: "$jobsposting.jobapplied" },
      //match userid
      { $match: { "jobsposting.jobapplied.user": req.user._id } }
    ])

      .then(company => {
        res.send(company);
      })
      .catch(() => {
        errors.job = "No Jobs Found";
        return res.status(400).send(errors);
      });
  }
);

module.exports = router;
