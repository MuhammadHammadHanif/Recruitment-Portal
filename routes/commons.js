const express = require("express");
const passport = require("passport");

// Models
const Companies = require("../models/Company");
const Students = require("../models/Student");
const Users = require("../models/User");
const Notifications = require("../models/Notification");

// Router
const router = express.Router();

// @route  GET commons/jobposting/:id
// @desc   GET Job posting
// @access Public
router.get(
  "/jobposting/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};

    Companies.find({ "jobsposting._id": req.params.id }, { "jobsposting.$": 1 })
      .then(job => res.send(job))
      .catch(() => {
        errors.job = "No Job Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  DELETE commons/jobposting/:id
// @desc   Delete jobposting
// @access Private
router.delete(
  "/jobposting/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    // check Authentication
    if (req.user.role == "Student") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }
    Companies.updateOne({ $pull: { jobsposting: { _id: req.params.id } } })
      .then(job => res.status(200).send(job))
      .catch(() => {
        errors.job = "No Job Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  GET commons/companyprofile/:id
// @desc   Return company profile
// @access Private
router.get(
  "/companyprofile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Companies.findOne({ user: req.params.id })
      .then(company => {
        return res.send(company);
      })
      .catch(() => {
        errors.company = "No Company Data Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  GET commons/studentprofile/:id
// @desc   Return student profile
// @access Private
router.get(
  "/studentprofile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};

    Students.findOne({ user: req.params.id })
      .then(student => {
        return res.send(student);
      })
      .catch(() => {
        errors.student = "No Student Data Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  GET commons/allstudentprofile
// @desc   Return student profile
// @access Private
router.get(
  "/allstudentprofile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    // check Authentication
    if (req.user.role == "Student") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }
    Students.find({})
      .then(student => {
        return res.send(student);
      })
      .catch(() => {
        errors.student = "No Students Data Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  GET commons/profile
// @desc   Return current profile
// @access Private
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // current user
    let errors = {};
    if (req.user.role === "Company") {
      Companies.findOne({ user: req.user._id })
        .populate("jobsposting.jobapplied.user", ["name", "_id", "email"])
        .then(profile => {
          if (!profile) {
            return res.status(404).send({});
          }
          return res.send(profile);
        })
        .catch(() => {
          errors.profile = "No Profile Found";
          return res.status(404).send(errors);
        });
    }
    if (req.user.role === "Student") {
      Students.findOne({ user: req.user._id })
        .then(profile => {
          if (!profile) {
            return res.status(404).send({});
          }
          return res.send(profile);
        })
        .catch(() => {
          errors.profile = "No Profile Found";
          return res.status(404).send(errors);
        });
    }
  }
);

// @route  GET commons/getalljobs
// @desc   Return all jobs
// @access Private
router.get(
  "/getalljobs",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // current user
    let errors = {};
    Companies.find({})
      .select("companyname user _id jobsposting")
      .then(jobs => {
        if (!jobs) {
          errors.jobs = "No Jobs Found";
          return res.status(404).send(errors);
        }
        return res.send(jobs);
      })
      .catch(() => {
        errors.jobs = "No Jobs Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  GET commons/getnotification/:id
// @desc   Get Notification
// @access Public
router.get(
  "/getnotification/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    // check Authentication

    Notifications.findOne({ user: req.params.id })
      .then(notifications => {
        if (!notifications) {
          errors.message = "No Notification Found";
          return res.status(404).send(errors);
        }
        return res.send(notifications);
      })
      .catch(err => {
        errors.message = "No Notification Found";
        return res.status(404).send(errors);
      });
  }
);

module.exports = router;
