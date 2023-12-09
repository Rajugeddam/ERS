// code for userSchema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: true
    },
    assignReview:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AssignReview',
            required: true
        },
    ],
    myReview:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MyReview',
            required: true
        }
    ]
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;