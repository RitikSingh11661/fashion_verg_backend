const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId: String,
    userEmail: String,
    userName: String,
    prodId: String,
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

const cartModel = mongoose.model("cart", schema);

module.exports = { cartModel };