import Container from '@mui/material/Container';
import ApiCall from '../../components/api/ApiCall';
import ListPlain from '../../components/lists/ListPlain';
import ForumCard from '../../components/forumCard/ForumCard';
import {useState} from 'react';
import { useEffect } from 'react';
function Forum(){

    const [data, setData] = useState([]);

    const goToPost = () => {
        console.log("clicked on post");
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
        <Container maxWidth='md'>
            <h2>NoStruggle Browsing</h2>
            
            {data.map((item) => <ForumCard onClick={goToPost} title={item.title} content={item.content} tag={item.tags} date={item.created_At} nLikes={item.nLikes} />)}
        </Container>
        
    )




}

export default Forum;