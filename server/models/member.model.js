const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    familyId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    childId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const Member = mongoose.model('member', memberSchema);

module.exports = Member;