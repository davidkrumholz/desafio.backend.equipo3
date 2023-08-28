const mongoose = require("mongoose");
const { post } = require("../server");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "The title is required"],
        minLength: 2,
        maxLength: 50,
        trim: true
    },
    image: {
        type: String,
        required: [true, "The image is required"],
        trim: true
    },
    body: {
        type: String,
        required: [true, "The body is required"],
        trim: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "User is required"],
        trim: true,
        ref: "User"
    },
    creatad_at: {
        type: new Date(),
        required: true,
        default: new Date(),
    },
    updated_at: {
        reype: new Date(),
        required: true,
        default: new Date()
    }
});

module.exports = mongoose.model("posts", postSchema);