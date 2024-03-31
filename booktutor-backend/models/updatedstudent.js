const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const BookTutor = require("../models/booktutor");

const updatedStudentSchema = new mongoose.Schema({
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
      notifications: [
        {
            // teacher: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'Teacher',
            //     // required: true,
            //   },
            teacherId: {
                type:String,
            },
            bookingId: {
                type: String
            },
          message: String,
          teachername: String,
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    verified: {type: Boolean, default: false},
    messages: [{ from: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, role: {type: String} , name: {type: String} ,  message: {type: String} , timestamp: {type: Date , default: Date.now} }],
    bookings: [
        BookTutor.schema
      ],
});

updatedStudentSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );
    return token;
}

const UpdatedStudent = mongoose.model('UpdatedStudent', updatedStudentSchema); // Create the Data model

module.exports = UpdatedStudent; // Export the Data model
