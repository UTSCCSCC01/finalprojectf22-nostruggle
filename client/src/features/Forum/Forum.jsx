import Container from '@mui/material/Container';
import ApiCall from '../../components/api/ApiCall';
import ListPlain from '../../components/lists/ListPlain';
import ForumCard from '../../components/forumCard/ForumCard';
import {useState} from 'react';
import { useEffect } from 'react';
import ForumThread from '../ForumThread/ForumThread';
import { Button } from "@mui/material";
import CreatePost from "../CreatePost/CreatePost"
import { useNavigate } from "react-router-dom";
//import Pagination from '../../components/forumCard/ForumCard.jsx'
import { Pagination} from '@mui/material';
import * as React from "react";

function Forum(){

    const [data, setData] = useState([]);
    const {clicked, setClicked} = false;
    const [newPost, setNewPost] = useState(false);
    const navigate = useNavigate();


    const goToPostThread = () => {
        console.log("post thread button clicked");
      //  return(
        //<ForumThread/>
       // )
    }

    useEffect(() => {
        const getForumPost = async () =>{
            await ApiCall.get('/forumPosts/get')
            .then(res => {
                //let data = res.data;
                setData(res.data.reverse());       
                //console.log(res.data))
                console.log(res.data);
                // const list = (data) => <ListPlain/>
                //const list = data.map((item) => <ForumCard title={item.title}/>)
            })
            .catch(e => {console.log(e);
               console.log("abc");
            })
        ;}

        getForumPost();
    }, []);

    const createNewPost = () => {
        console.log("create a new post");
        setNewPost(true);
        navigate('/createPost');
        return(<CreatePost/>)
    }
   /* const getForumPost = async () => {
        await ApiCall.get('/forumPosts/get')
        .then(res => {
            //let data = res.data;
            setData(res.data);       
            //console.log(res.data))
            console.log(data);
           // const list = (data) => <ListPlain/>
            //const list = data.map((item) => <ForumCard title={item.title}/>)
        })
        .catch(e => {console.log(e);
            console.log("abc");
        });
    }

    getForumPost()
    */
   
   const [page, setPage] = React.useState(1);
   const handleChange = (event, value) => {
       setPage(value);
   };


    return(
        

        <Container maxWidth='md'>
            <h1>NoStruggle Browsing</h1>
            <Button sx={{mb: 3}} variant="contained" onClick={createNewPost}>Create a new Post</Button>
            {data.slice((page-1)*10,page*10).map((item) => <ForumCard title={item.title} content={item.content} tag={item.tags}
                date={item.created_At} nLikes={item.nLikes} postId={item._id} created_by={item.created_by}
                likedBy={item.likedBy} />
            )}
            <Pagination count={Math.ceil(data.length/10)} color="primary"  page={page} 
                    onChange={handleChange}/>
        </Container>

        
    )




}

export default Forum;