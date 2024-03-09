const mongoose=require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId


const restourant = new mongoose.Schema({

    name:{type:String,required:true},

    email:{type:String},

    contactNo:{type:String},

    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        pincode: { type: Number, require: true, trim: true }
    },

    rating:{type:Number},

    pic:{type:String}

},{timestamps: true})

module.exports= mongoose.model('Shop', restourant)