import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_by: {type:mongoose.Schema.Types.ObjectId, ref: "users"},
    tags: { type: [String] },
    created_At: { type: Date, default: Date.now },
    nLikes: {type: Number},
});
/*
PostSchema.pre("save", (next) => {
    now = new Date();
    if(!this.createdAt){
        this.createdAt = now;
    }

    next();
});
*/
const Post = mongoose.model('Post', postSchema);

export default Post;