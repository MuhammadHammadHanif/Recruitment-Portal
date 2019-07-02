const mongoose = require("mongoose");

// DB config
const connectionURL = require("./keys").URL;

// connect to mongoose
mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => console.log("Mongoose Connected"))
  .catch(err => console.log(err));
