const mongoose = require("mongoose");

const shippingSchema = mongoose.Schema(
  {
    userId: String,
    country: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    company: String,
    pincode: String,
    phone: String,
    declaration: Boolean,
  }
  ,{versionKey: false}
);

const shippingAddress = mongoose.model("Address", shippingSchema);

module.exports = {shippingAddress};
