import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_by: {type: String, required: true },
    tags: { type: String, required: true },
    created_At: { type: Date, default: Date.now },
    nLikes: {type: Number},
    updated: { type: Date }
});

const Post = mongoose.model('Post', postSchema);

export default Post;