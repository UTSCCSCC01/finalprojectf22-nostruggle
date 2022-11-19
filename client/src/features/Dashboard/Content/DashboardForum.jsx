import Container from '@mui/material/Container';
import ApiCall from '../../../components/api/ApiCall';
import ListPlain from '../../../components/lists/ListPlain';
import ForumCard from '../../../components/forumCard/ForumCard';
import {useState} from 'react';
import { useEffect } from 'react';
import ForumThread from '../../ForumThread/ForumThread';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DashboardForum(){

    const [data, setData] = useState([]);
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
        

        <>
            {data.slice(0,5).map((item) => <ForumCard title={item.title} tag={item.tags}
             date={""} nLikes={item.nLikes} postId={item._id} created_by={item.created_by}
             likedBy={item.likedBy}/>)}
        </>
        
    )




}

export default DashboardForum;