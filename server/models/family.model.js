const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const familySchema = new Schema({
    fatherId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    motherId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const Family = mongoose.model('family', familySchema);

module.exports = Family;