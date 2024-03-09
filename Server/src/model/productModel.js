const mongoose = require("mongoose")


const productSchema = new mongoose.Schema(
    {
        title: String,
        price: String,
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop"
        },
        image: String,
        catogary: String
    }
)
module.exports = mongoose.model("Product", productSchema)