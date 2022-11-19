import Comment from "../models/comment.model.js";

export const postComment = async(req, res) => {
    const comContent = req.body.content;
    const comCreated_by = req.body.created_by;
    const comNLikes = req.body.nLikes;
    const comCreated_At = req.body.createdAt;
    const comComment_of = req.body.comment_of;

    const comment = new Comment(({content: comContent, created_by: comCreated_by,
    nLikes: comNLikes, createdAt: comCreated_At, comment_of: comComment_of}))

    try{
        await comment.save();
        res.status(201).json(comment);
    } catch(e){
        res.status(409).json({message: e.message});
    }

}

export const getComments = async(req, res) => {
    
    try{
        const comments = await Comment.find({child_of: req.params.answerId});
        res.status(201).json(comments);
    } catch(e){
        res.status(409).json({message: e.message});
    }
}
