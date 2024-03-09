const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shopId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    isDeleted: { type: Boolean, default: false },
    comments: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("Ccomment", CommentSchema)