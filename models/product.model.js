const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:String,
    images: Object,
    brand: String,
    oprice:Number,
    price:Number,
    category: String,
    subhead:String,
    discount:String,
})

const prodModel = mongoose.model("product", schema);

module.exports = { prodModel };