const mongoose = require("mongoose");
const Posts = require("../models/post.model");
const User = require("../models/user.model");
const createError = require("http-errors");

async function getAll(filterTitle) {
    const filters = {};
    if(filterTitle) {
        filters.title = new RegExp(filterTitle, 'i');
    }
    const allPosts = await Posts.find(filters).populate("user");
    return allPosts;
}

async function create(postObject) {
    const userId = postObject.user;
    if(!mongoose.isValidObjectId(userId)) {
        throw new createError(400, "Invalid user id");
    }

    const user = await User.findById(userId);
    if(!user) {
        throw new createError(404, "User not found");
    }

    const newPost = await Posts.create(postObject);
    return newPost;
}

async function deleteById(postId) {
    if(!mongoose.isValidObjectId(postId)) {
        throw new createError(400, "Invalid id");
    }

    const post = await Posts.findByIdAndDelete(postId);
    if(!post) {
        throw new createError(404, "post not found");
    }

    return post;
}

async function uptdateById(postId, postObject) {
    if(!mongoose.isValidObjectId(postId)) {
        throw new createError(400, "invalid id");
    }

    if(postObject.user) {
        if(!mongoose.isValidObjectId(postObject.user)) {
            throw new createError(400, "Invalid user id");
        }
        const user = await User.findById(postObject.user);
        if(!user) {
            throw new createError(404, "User not found");
        }
    }

    const postUpdated = await Posts.findByIdAndUpdate(postId, postObject, {new: true, runValidators: true}).populate({path: "user"});
    if(!postUpdated) {
        throw new createError(404, "post not found");
    }

    return postUpdated;
}


module.exports = {
    getAll,
    create,
    deleteById,
    uptdateById
}