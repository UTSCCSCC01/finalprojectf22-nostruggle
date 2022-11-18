
import { Typography, CardContent, Card, Box, Paper, Chip, Item, Button, IconButton} from '@mui/material';
import { useState, useContext, useRef } from 'react';
import { usePostState } from '../../features/Forum/PostContext';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../features/SignUp/UserContext';
import { FavoriteBorder, ThumbUp } from '@mui/icons-material';

const ForumCard = (props) => {
    const title = props.title;
    const content = props.content;
    const tag = props.tag;
    const date = props.date;
    const nLikes = props.nLikes;
    const updatedDate = date.split("T")[0];
    const postIdselected = props.postId;
    const created_by = props.created_by;
    let likedBy = props.likedBy
    console.log("props.likedbylength" + props.likedBy.length);
    console.log("liked by" + likedBy);

    const {userState, setUserState} = useUserState();

    const [likedByUser, setLikedByUser] = useState(likedBy.includes(userState.user.username));
   // const [likedByUser, setLikedByUser] = useState(likedBy.length == 0);
   // console.log(likedByUser);

    const navigate = useNavigate();

    const forumCardSettingsRef = useRef();

    const { postState, setPostState } = usePostState();

    const [ openEditor, toggleOpenEditor ] = useState(false)
    const [ openEditorMenu, toggleOpenEditorMenu ] = useState(false)

    const goToPost = () => {
        console.log("clicked on post" + postIdselected);
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

    const likePost = () => {
        setLikedByUser(!likedByUser);


    }

    return (
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
                <IconButton>
                    <ThumbUp color={likedByUser ? "primary" : "default"} onClick={likePost}/>
                </IconButton>
                <Button variant="outlined" onClick={goToPost}>View Post</Button>
            </CardContent>
           

        </Card>
    )

}

export default ForumCard;