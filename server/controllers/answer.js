import Answer from "../models/answer.model.js";

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