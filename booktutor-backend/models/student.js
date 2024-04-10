const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
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
    age: {
        type: Number,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    role: {
        type: String,
    },
    image: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
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

studentSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );
    return token;
}

const Student = mongoose.model('Student', studentSchema); // Create the Data model

module.exports = Student; // Export the Data model
