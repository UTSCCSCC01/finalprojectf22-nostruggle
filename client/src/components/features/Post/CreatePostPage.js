
import { TextField, Button, Chip } from "@mui/material";
import React from "react";
import axios from 'axios'


function CreatePostPage(){
    //const [forumPost, setForumPost] = React.useState({username: "example", password: "content"});

   // const [title, setTitle] = React.useState('');
  //  const [content, setContent] = React.useState('');
  //  const [tags, setTags] = React.userState([]);
    const [postData, setPostData] = React.useState({ title: '',
        content: '',
        created_by: 'default-user',
        tags: [],
        createdeAt: Date.now,
        nLikes: 0});

    const handleClick = (event) => {

    }

    const createForumPost = async (event) => {
    
        event.preventDefault();

        //setPostData()
        await axios.post('http://localhost:2800/forumPosts/post', postData)
        .then(res => console.log(res.data))
        .catch(e => {
            console.log(e);
        });
        
    }
/*
    const enterTitle = (event) => {
        setTitle(event.target.value);
    }

    const enterContent = (event) => {
        setContent(event.target.value);
    }
*/

    return (
        <div>
            <p>
                <h1> Add a New Post</h1>
                <TextField 
                id="title" 
                label="Title of Post" 
                variant="outlined"
                fullWidth={true}
               // onChange={enterTitle}
                />
            </p>

            <p>
                <TextField 
                id="content" 
                label="Content of Post" 
                variant="outlined"
                fullWidth={true}
                multiline={true}
                rows={8}
              //  onChange={enterContent}
                /> 
            </p>

            <h3>Select tags:</h3>

            <p>
                <Chip 
                    label="Advice"
                  //  onClick={handleClick}
                /> 
                <Chip 
                    label="Homework Help"
                   // onClick={handleClick}
                />   
                <Chip 
                    label="Computer Science"
                 //   onClick={handleClick}
                />   
                <Chip 
                    label="Linear Algebra"
                 //   onClick={handleClick}
                />   
                <Chip 
                    label="Calculus"
                 //   onClick={handleClick}
                />
            </p>



            <Button onClick={ createForumPost }variant="contained">POST</Button>

        </div>
        
    );
}

export default CreatePostPage;