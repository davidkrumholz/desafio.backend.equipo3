const mongoose = require("mongoose");

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
    tags: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return Array.isArray(value) && value.length > 0;
            },
            message: "at least one tag required",
        },
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "User is required"],
        trim: true,
        ref: "User"
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

module.exports = mongoose.model("posts", postSchema);