import Post from '../models/post.model.js';

export const createPost = async (req, res) => {
    const postTitle = req.body.title;
    const postContent = req.body.content;
    const postCreated_by = req.body.created_by;
    const postTags = req.body.tags;
    const postCreatedAt = req.body.createdAt;
    const postNLikes = req.body.nLikes;

    const newPost = new Post(({title: postTitle, content:postContent, 
    created_by: postCreated_by, tags:postTags, createdAt: postCreatedAt,
     nLikes:postNLikes}));

     try {
        await newPost.save();
        res.status(201).json(newPost);
     } catch(e){
        res.status(409).json({message: e.message });
     }

};

export const getPost = async (req, res) => {

    try {
       const posts = await Post.find();
       console.log(posts);
       res.status(201).json(posts);
    } catch(e){
       res.status(409).json({message: e.message });
    }

};

export const getPostById = async (req, res) => {
   console.log('abc');
   try {
      const post = await Post.findById({_id: req.params.postId})
      console.log(post);
      res.status(201).json(post);
   } catch(e){
      res.status(409).json({message: e.message});
   }
}
