const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    fullName: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    residence: {
        type: String
    },
    education: {
        type: String
    },
    dateOfGraduation: {
        type: String
    },
    technicalSkills: {
        type: String
    },
    softSkills: {
        type: String
    },
    image: {
        type: String
    }

});

mongoose.model('UserInfo', dataSchema);