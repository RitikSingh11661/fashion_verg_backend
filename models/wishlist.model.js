const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userId: String,
    name: String,
    image: Object,
    brand: String,
    originalPrice: String,
    discountPrice: String,
    category: String
})

const wishlistModel = mongoose.model("wishlist", schema);

module.exports = { wishlistModel };