import mongoose from "mongoose";

const aboutMeSchema = mongoose.Schema({
    username: { type: String, required: true, trim:true, minlength: 1 },
    content: { type: String }
}, {
    timestamps: true
});

const AboutMe = mongoose.model('AboutMe', aboutMeSchema);

export default AboutMe;