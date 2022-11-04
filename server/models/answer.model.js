import mongoose, { Schema } from "mongoose";

const answerSchema = mongoose.Schema({
    content: { type: String, required: true },
    created_by: { type: String, required: true},
    nLikes: {type: Number},
    created_At: { type: Date, default: Date.now},
    child_of: {type: String, required: true},
    comments: {type: [String]}
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
