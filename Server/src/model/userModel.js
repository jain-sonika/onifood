const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    phone: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profileImage:String,
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        pincode: { type: Number, require: true, trim: true }
    }
})


module.exports = mongoose.model("User", UserSchema)