const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

// Loading Database
require("./config/mongoose");

// Loading routes
const users = require("./routes/users");
const companies = require("./routes/companies");
const commons = require("./routes/commons");
const students = require("./routes/students");
const admins = require("./routes/admin");

const app = new express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// routes
app.use("/users", users);
app.use("/companies", companies);
app.use("/commons", commons);
app.use("/students", students);
app.use("/admins", admins);

// PORT
const port = process.env.PORT || 5000;

// Server listener
app.listen(port, () => console.log(`Server Running On Port ${port}`));
