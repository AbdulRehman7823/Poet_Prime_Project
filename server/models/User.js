const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    userType: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    city: { type: String },
    img: { type: String, required: true },
    isAdmin: { type: Boolean },
    poetType: { type: String },
    requests: [
      {
        readerId: { type: String },
        username: { type: String },
        email: { type: String },
        img: { type: String },
        data: { type: Object },
      },
    ],
    poetCustomers: [
      {
        readerId: { type: String },
        username: { type: String },
        email: { type: String },
        img: { type: String },
        data: { type: Object },
      },
    ],
    poetAccepts: [
      {
        readerId: { type: String },
      },
    ],
    poetAppointmentHistory: [
      {
        readerId: { type: String },
        username: { type: String },
        age: { type: Number },
        dateTime: { type: String },
      },
    ],
    subscriptionfee: { type: Number },
  },
  { timestamps: true }
);
const user = mongoose.model("User", userSchema);
module.exports = user;
