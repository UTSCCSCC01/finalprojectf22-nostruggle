import Answer from "../models/answer.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const postAnswer = async (req, res) => {
    const ansContent = req.body.content;
    const ansCreated_by = req.body.created_by;
    const ansNLikes = req.body.nLikes;
    const ansCreated_At = req.body.created_At;
    const ansChild_of = req.body.child_of;
    const ansComments = req.body.comments;

    const newAnswer = new Answer(({content: ansContent,
    created_by: ansCreated_by, nLikes: ansNLikes, created_at: ansCreated_At,
    child_of: ansChild_of, comments: ansComments}));

    try {
        await newAnswer.save();
        res.status(201).json(newAnswer);
    } catch(e){
        res.status(409).json({message: e.message});
    }


}


export const getAnswers = async(req, res) => {
    console.log('this is the parameter ' + req.params.postId);
    try {
        const answers = await Answer.find({child_of: req.params.postId});
        console.log(answers);
        console.log("fetch answers");
        res.status(201).json(answers);
    } catch(e) {
        res.status(409).json({message: e.message});
    }
    
}

export const getAnswersQuery = async(req, res) => {
    console.log('this is the parameter ' + req.params.postId);
    try {
        const answers = await Answer.find({...req.query});
        console.log(answers)
        console.log(answers);
        console.log("fetch answers");
        res.status(201).json(answers);
    } catch(e) {
        res.status(409).json({message: e.message});
    }
    
}

export const getPostById = async (req, res) => {

    try {
      // const post = await Post.find({title: req.body.postId})
       //const post = await Post.find({title: "new computer for loop"});
       //const post = await Post.findById('634b447487873860a7fdff48');
       const post = await Post.findById(req.params.postId);
       console.log("req is" + req.params.postId);
        console.log(post);
       console.log("abc123");
       res.status(201).json(post);
    } catch(e){
       res.status(409).json({message: e.message});
    }
}

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