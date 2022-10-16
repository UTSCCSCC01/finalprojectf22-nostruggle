import { TextField, Button, Chip } from "@mui/material";
import { useState } from 'react'
import axios from 'axios'

function CreatePost(){
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [contentFilled, setContentFilled ] = useState(true);
    const [titleFilled, setTitleFilled ] = useState(true);

    const [tagSelected, setTagSelected] = useState('');

    const [tagError, setTagError] = useState(false);

    const [postData, setPostData] = useState({ title: '',
        content: '',
        created_by: 'default-user',
        tags: "",
        created_At: Date.now,
        nLikes: 0
    });

    const handleClick = (props) => {
        console.log(props.tag);
        setTagSelected(props.tag);
        console.log(tagSelected);

        setTagError(false);
        setPostData(previousState => {return {...previousState, tags: props.tag}});

    }

    const createForumPost = async (event) => {
    
        event.preventDefault();

        await axios.post(process.env.REACT_APP_SERVER_URL + '/forumPosts/post', postData)
        .then(res => console.log(res.data))
        .catch(e => {
            console.log(e);
   
            if(title == ''){
                setTitleFilled(false);
                console.log("title is set to false")
            }
            else{
                setTitleFilled(true);
                console.log("title is set to true")
            }
            if(content == ''){
                setContentFilled(false);
            }
            else{
                setContentFilled(true);
            }

            if(tagSelected == ""){
                setTagError(true);
            }
            console.log(title);
            console.log(titleFilled);
            return <h3>Please add a title and content</h3>
        });
        
    }

    const enterTitle = (event) => {
        setTitle(event.target.value);
        console.log({title});
        setTitleFilled(true);
        setPostData(previousState => { return {...previousState, title: event.target.value}});
    }

    const enterContent = (event) => {
        setContent(event.target.value);
        setContentFilled(true);
        setPostData(previousState => { return {...previousState, content: event.target.value}});
    }


    const tags = [ 'Advice', 'Homework Help', 'Computer Science', 'Linear Algebra', 'Calculus' ];

    return (
        <div>
            <p>
                <h1> Add a New Post</h1>
                <TextField 
                id="title" 
                label="Title of Post" 
                variant="outlined"
                fullWidth={true}
                error={!titleFilled}
                helperText={!titleFilled ? "Please enter a title" : ""}
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
                error={!contentFilled}
                helperText={!contentFilled ? "Please enter content for the post" : ""}
                rows={8}
                onChange={enterContent}
                /> 
            </p>
            <h3>Select tags:</h3>

            <p>{ tags.map((tag) => <Chip label={ tag } color={tag == tagSelected ? "primary": "default"} onClick={ (e) => handleClick({tag}, e) }/>)}</p>

            <p style={{color: "#d32f2f"}}>{tagError == true ? "Please select a tag to continue" : ""}</p>

            <Button onClick={ createForumPost }variant="contained">POST</Button>
            
        </div> 
    )
}

export default CreatePost;