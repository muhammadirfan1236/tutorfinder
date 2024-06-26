const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
    },
    lastname: {
       type: String, 
    },
    subject: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    price: {
        type: String,
        // required: true
    },
    role: {
        type: String,
    },
    education: {
        type: String,
        // required: true
    },
    description:{
        type: String,
    },
    location: {
        type: String,
        // required: true
    },
    image: {
        type: String
    },
    age: {
        type: String,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true
    },
    isOnline: {
        type: Boolean,
        default: false // Set default status as offline
      },
    verified: {type: Boolean, default: false},
});

teacherSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );
    return token;
}

const Teacher = mongoose.model('Teacher', teacherSchema); // Create the Data model

module.exports = Teacher; // Export the Data model
