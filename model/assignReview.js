// code for review schema
const mongoose = require('mongoose');

const assignReviewSchema = new mongoose.Schema({
    fromUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    toUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},{
    timestamps: true
});

const AssignReview = mongoose.model('AssignReview', assignReviewSchema);
module.exports = AssignReview;