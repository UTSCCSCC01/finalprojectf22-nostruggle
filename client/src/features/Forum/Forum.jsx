import Container from '@mui/material/Container';
import ApiCall from '../../components/api/ApiCall';
import ListPlain from '../../components/lists/ListPlain';
function Forum(){

    //const []
    const getForumPost = async () => {
        await ApiCall.get('/forumPosts/get')
        .then(res => console.log(res.data))
        .catch(e => {console.log(e);
            console.log("abc");
        });
    }

    getForumPost()
    return(
        <Container maxWidth='lg'>
            <h2>NoStruggle Browsing</h2>
            
        </Container>
        
    )




}

export default Forum;