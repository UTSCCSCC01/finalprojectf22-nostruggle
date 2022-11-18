import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    content: {type: String, required: true},
    created_by: {type: String, required: true},
    nLikes: {type: Number},
    created_At: {type: Date, default: Date.now},
    comment_of:{type: String, required: true},

})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;