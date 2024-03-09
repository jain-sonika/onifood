const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        items:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product"
                },
                quantity:Number,
                productImg:String,
                productName:String,

            }
        ],
        totalPrice:Number,
        totalItems:Number
    }
)

module.exports = mongoose.model("Card", cardSchema)