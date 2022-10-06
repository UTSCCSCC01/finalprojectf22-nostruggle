import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { 
        type: String,
        required: true, 
        unique: true, 
        trim:true, 
        minlength: [6, 'Must be at least 6 characters'] 
    }, password: { 
        type: String, 
        required: true, 
        trim: true, 
        minlength: [6, 'Must be at least 6 characters'] 
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;