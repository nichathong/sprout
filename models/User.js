const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    garden:{
        type: [{type: Schema.Types.ObjectId}],
        ref: 'gardens'
    },
    public:{
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
      }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;