import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_by: {type:mongoose.Schema.Types.ObjectId, ref: "users"},
    tags: { type: [String] },
    createdeAt: { type: Date, default: Date.now },
    nLikes: {type: int},
});

PostSchema.pre("save", (next) => {
    now = new Date();
    if(!this.createdAt){
        this.createdAt = now;
    }

    next();
});

const Post = mongoose.model('Post', PostSchema);

export default Post;