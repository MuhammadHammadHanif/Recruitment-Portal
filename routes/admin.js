const express = require("express");
const passport = require("passport");

// User model
const Users = require("../models/User");
const Students = require("../models/Student");
const Companies = require("../models/Company");
const Notifications = require("../models/Notification");

// Load validation
const validateNotificationInput = require("../validations/notification");

const router = express.Router();

// @route  DELETE admins/deletestudent/:id
// @desc   Delete Student
// @access Private
router.delete(
  "/deletestudent/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    // check Authentication
    if (req.user.role !== "Admin") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }
    // console.log(req.params.id);

    Users.findByIdAndDelete(req.params.id).then(() => {
      Students.findOneAndDelete({ user: req.params.id })
        .then(() => {
          Companies.find({}).then(companies => {
            let jobsdeleted = companies.flatMap(company =>
              company.jobsposting.flatMap(data =>
                data.jobapplied.filter(
                  apply => apply.user.toString() === req.params.id.toString()
                )
              )
            );
            if (jobsdeleted.length !== 0) {
              for (let i = 0; i < jobsdeleted.length; i++) {
                Companies.update(
                  { "jobsposting.jobapplied.user": req.params.id },
                  {
                    $pull: {
                      "jobsposting.$.jobapplied": { user: req.params.id }
                    }
                  },
                  { multi: true }
                );
              }
            }
          });
        })
        .catch(err => {
          return res.send(err);
        });

      return res.send({ student: "deleted" });
    });
  }
);

// @route  DELETE admins/deletecompany/:id
// @desc   Delete Student
// @access Private
router.delete(
  "/deletecompany/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    // check Authentication
    if (req.user.role !== "Admin") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }
    Users.findByIdAndDelete(req.params.id)
      .then(() => {
        Companies.findOneAndDelete({ user: req.params.id })
          .then(() => {
            return res.send({ status: "Deleted" });
          })
          .catch(() => {
            errors.status = "Company Not Found";
            return res.status(404).send(errors);
          });
      })
      .catch(() => {
        errors.status = "User Not Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  GET admins/getallcompanies
// @desc   GET Companies
// @access Private
router.get(
  "/getallcompanies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    // check Authentication
    if (req.user.role !== "Admin") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }
    Companies.find({})
      .then(company => {
        return res.send(company);
      })
      .catch(() => {
        errors.company = "No Companies Found";
        return res.status(404).send(errors);
      });
  }
);

// @route  POST admins/sendnotification/:id
// @desc   Send Notification
// @access Private
router.post(
  "/sendnotification/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNotificationInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).send(errors);
    }

    // check Authentication
    if (req.user.role !== "Admin") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }

    let { message } = req.body;

    Notifications.findOne({ user: req.params.id })
      .then(notification => {
        if (notification) {
          Notifications.findOneAndUpdate(
            { user: req.params.id },
            { $push: { message } },
            { new: true }
          ).then(notification => {
            return res.status(200).send(notification);
          });
        } else {
          // create new notification
          const newNotification = {
            user: req.params.id,
            message
          };
          new Notifications(newNotification)
            .save()
            .then(notification => res.status(201).send(notification));
        }
      })
      .catch(err => console.log(err));
  }
);

// @route  POST admins/sendnotificationtoall
// @desc   Send Notification to all
// @access Private
router.post(
  "/sendnotificationtoall",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // check Authentication
    if (req.user.role !== "Admin") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }

    let errors = {};
    let { message } = req.body;

    Notifications.find({})
      .then(() => {
        Notifications.updateMany(
          { user: { $ne: req.user._id } },
          {
            $push: { message }
          },
          { new: true }
        )
          .then(() => {
            return res.send({ message });
          })
          .catch(() => {
            errors.message = "Inserting Notification Failed";
            return res.status(404).send(errors);
          });
      })
      .catch(() => {
        errors.message = "No Users Are Registered";
        return res.status(404).send(errors);
      });
  }
);

// @route  POST admins/deletenotification/:id
// @desc   Delete Notification
// @access Private
router.delete(
  "/deletenotification/:id/:message",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // check Authentication
    if (req.user.role !== "Admin") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }

    let errors = {};
    let { message } = req.body;
    Notifications.findOne({ user: req.params.id })
      .then(notification => {
        if (!notification) {
          errors.message = "User not found1";
          return res.status(400).send(errors);
        }
        if (req.params.message) {
          notification.message.splice(req.params.message, 1);
        } else {
          errors.message = "Message Not Found";
          return res.status(400).send(errors);
        }
        notification
          .save()
          .then(notification => {
            return res.send(notification);
          })
          .catch(() => {
            errors.message = "Message Not Found";
            return res.status(400).send(errors);
          });
      })
      .catch(() => {
        errors.message = "User not found2";
        return res.status(400).send(errors);
      });
  }
);

// @route  GET admins/allnotification
// @desc   Get Notification
// @access Private
router.get(
  "/allnotification",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    // check Authentication
    if (req.user.role !== "Admin") {
      errors.authenticate = "You are not Authorized";
      return res.status(400).send(errors);
    }

    Notifications.find({})
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
