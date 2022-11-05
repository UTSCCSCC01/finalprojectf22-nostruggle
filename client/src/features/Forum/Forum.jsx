import Container from '@mui/material/Container';
import ApiCall from '../../components/api/ApiCall';
import ListPlain from '../../components/lists/ListPlain';
import ForumCard from '../../components/forumCard/ForumCard';
import {useState} from 'react';
import { useEffect } from 'react';
import ForumThread from '../ForumThread/ForumThread';
import { Button } from "@mui/material";
import CreatePost from "../CreatePost/CreatePost"
import { useNavigate } from "react-router-dom"

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
                setData(res.data);       
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
    return(
        

        <Container maxWidth='md'>
            <h2>NoStruggle Browsing</h2>
            <Button onClick={createNewPost}>Create a new Post</Button>
            {data.map((item) => <ForumCard title={item.title} content={item.content} tag={item.tags}
             date={item.created_At} nLikes={item.nLikes} postId={item._id} created_by={item.created_by}/>)}
        
            <Button onClick={goToPostThread}>Post Thread Page</Button>
            <h1>{clicked}</h1>
            <ForumThread/>
        </Container>
        
    )




}

export default Forum;