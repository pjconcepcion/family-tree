const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    middleName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

const Person = mongoose.model('person', personSchema);

module.exports = Person;