const mongoose = require("mongoose");
const createError = require("http-errors");
const User = require("../models/user.model");
const bcrypt = require("../lib/bcrypt");

async function create(userObject) {
    const userExist = await User.findOne({ email: userObject.email });
    console.log(userExist);
    if(userExist) {
        throw new createError(412, "The email is already in use");
    }

    const passwordValidation = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-.+]).{8,}$");

    if(!passwordValidation.test(userObject.password)) {
        throw new createError(400, "Password to week");
    }

    //Agregar password hash con libreria de bcrypt encrypt
    const passwordHash = bcrypt.encrypt(userObject.password);
    userObject.password = passwordHash;

    const newUser = await User.create(userObject);
    return newUser;
}

async function getById(userId) {
    if(!mongoose.isValidObjectId(userId)) {
        throw new createError(400, "Invalid id");
    }

    const user = await User.findById(userId);
    if(!user) {
        throw new createError(404, "User not found");
    }

    return user; 
}

module.exports = {
    create,
    getById
}