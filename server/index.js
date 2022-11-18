import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(cors());

import userRouter from './routes/users.js';

import taskRouter from './routes/tasks.js'

import openApiRouter from './routes/openApi.js';

import postRouter from './routes/post.js';

import notificationRouter from './routes/notifications.js';

import answerRouter from './routes/answers.js';

import commentRouter from './routes/comment.js';
app.use('/users', userRouter);
app.use('/forumPosts', postRouter);
app.use('/openapi', openApiRouter);
app.use('/tasks', taskRouter)
app.use('/notification', notificationRouter)

app.use('/answers', answerRouter);
app.use('/postThread', answerRouter);
app.use('/comment', commentRouter);

const uri = process.env.URI;
const port = process.env.PORT || 2800;
const options = { useNewUrlParser: true, useUnifiedTopology: true};

try {
    mongoose.connect(uri, options).then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)));
  } catch (e) {
    console.error(e);
};
