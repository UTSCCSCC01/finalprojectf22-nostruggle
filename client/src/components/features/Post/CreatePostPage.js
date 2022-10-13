
import { TextField, Button, Chip } from "@mui/material";
import React from "react";
import { useState } from 'react'
import axios from 'axios'


function CreatePostPage(){
    
    const [forumPost, setForumPost] = React.useState({username: "example", password: "content"});

    const [title, setTitle] = React.useState({title: ''});
    const [content, setContent] = React.useState({content: ''});
    const [tags, setTags] = React.useState([]);
    const [postData, setPostData] = React.useState({ title: '',
        content: '',
        created_by: 'default-user',
        tags: [],
        created_At: Date.now,
        nLikes: 0});

    const handleClick = (event) => {
        
    }

    const createForumPost = async (event) => {
    
        event.preventDefault();

        //setPostData(previousState => { return {...previousState, title: `${title}`, content: `${content}`}});
        await axios.post('http://localhost:2800/forumPosts/post', postData)
        .then(res => console.log(res.data))
        .catch(e => {
            console.log(e);
            return <h3>Please add a title and content</h3>
        });
        
    }

    const enterTitle = (event) => {
        setTitle(event.target.value);
        console.log({title});
        setPostData(previousState => { return {...previousState, title: event.target.value}});
    }

    const enterContent = (event) => {
        setContent(event.target.value);
        setPostData(previousState => { return {...previousState, content: event.target.value}});
    }


    return (
        <div>
            <p>
                <h1> Add a New Post</h1>
                <TextField 
                id="title" 
                label="Title of Post" 
                variant="outlined"
                fullWidth={true}
                onChange={enterTitle}
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
                onChange={enterContent}
                /> 
            </p>

            <h3>Select tags:</h3>

            <p>
                <Chip 
                    label="Advice"
                    onClick={handleClick}
                /> 
                <Chip 
                    label="Homework Help"
                    onClick={handleClick}
                />   
                <Chip 
                    label="Computer Science"
                    onClick={handleClick}
                />   
                <Chip 
                    label="Linear Algebra"
                   onClick={handleClick}
                />   
                <Chip 
                    label="Calculus"
                    onClick={handleClick}
                />
            </p>



            <Button onClick={ createForumPost }variant="contained">POST</Button>

        </div>
        
    );
}

export default CreatePostPage;