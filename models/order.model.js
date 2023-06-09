const mongoose = require("mongoose");


const schema = mongoose.Schema({
    _id: String,
    createdAt: String,
    userId: String,
    userEmail: String,
    userName: String,
    prodId: String,
    addressId: String,
    name: String,
    image: Object,
    oprice: Number,
    price: Number,
    category: String,
    quantity: Number,
    description: String,
    discount: String,
    subhead: String,
    status: String,
})

const orderModel = mongoose.model("order", schema);

module.exports = { orderModel };