const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Notification Schema
const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  message: {
    type: [String],
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Notification = mongoose.model(
  "notifications",
  notificationSchema
);
