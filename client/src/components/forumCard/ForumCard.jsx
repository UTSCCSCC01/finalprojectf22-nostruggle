
import { Typography, CardContent, Card, Box, Paper, Chip, Item, Button} from '@mui/material';
import { useState, useContext, useRef } from 'react';
import { usePostState } from '../../features/Forum/PostContext';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../features/SignUp/UserContext';
const ForumCard = (props) => {
    const title = props.title;
    const content = props.content;
    const tag = props.tag;
    const date = props.date;
    const nLikes = props.nLikes;
    const updatedDate = date.split("T")[0];
    const postIdselected = props.postId;
    const created_by = props.created_by;

    const navigate = useNavigate();

    const forumCardSettingsRef = useRef();

    const {userState, setUserState} = useUserState();

    const { postState, setPostState } = usePostState();

    const [ openEditor, toggleOpenEditor ] = useState(false)
    const [ openEditorMenu, toggleOpenEditorMenu ] = useState(false)

    const goToPost = () => {
        console.log("clicked on post" + postIdselected);
        /*
        console.log(postState);
        console.log(postState.postId);
       
        setPostState({
            ...postState,
            postId: postIdselected,
        })
        console.log(postState.postId);
        */
        setUserState({
            ...userState,
            postId: postIdselected
        })

        navigate('/postThread/' + postIdselected);
    }

    const editPost = () => {
        toggleOpenEditor(true)
    }

    const deletePost = () => {
        
    }

/*
<Box sx = {{ display: 'grid', gridAutoColumns: '1fr', gap: 1}}
                    <Box sx ={{gridRow: '1', gridColumn: 'span 2'}}>1</Box>
                    <Box sx ={{gridRow: '1', gridColumn: '4 / 5'}}>2</Box>
                    <Box sx ={{gridRow: '1', gridColumn: '4 / 5'}}>3</Box>
                    </Box>
*/
    return (
       // <PostContext.Provider value={postIdselected}>
        <Card sx={{mb: 3 }}>
            <CardContent>
                <Typography variant="h5" sx={{fontWeight: "bold"}}>
                    {title}
                </Typography>
                <Typography variant="body1" sx = {{fontWeight: "regular"}}>
                    {content}
                </Typography>
                
                <Typography>
                    {updatedDate}  
                </Typography>  
                
                <Typography>     
                    Likes: {nLikes}
                </Typography>
            
                <Chip label={tag}></Chip>
                <Button variant="outlined" onClick={goToPost}>View Post</Button>
            </CardContent>
           

        </Card>
      //  </PostContext.Provider>
    )

}

export default ForumCard;