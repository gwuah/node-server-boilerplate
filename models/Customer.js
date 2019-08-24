const mongoose = require("mongoose");
const constants = require("../constants");

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  telephone: { type: String, required: true, unique: true },
  email: { type: String },
  salt: { type: String },
  role: { type: String, default: constants.roles.customer, uppercase: true }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
