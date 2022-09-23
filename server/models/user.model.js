import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim:true, minlength: 6 },
    password: { type: String, required: true, trim: true, minlength: 6 }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;