
import { Typography, CardContent, Card, Box, Paper, Chip, Item, Button, IconButton, MenuList, MenuItem, ClickAwayListener} from '@mui/material';
import { Delete, Edit, MoreVert, Settings } from '@mui/icons-material';
import { useState, useContext, useRef } from 'react';
import { usePostState } from '../../features/Forum/PostContext';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../features/SignUp/UserContext';
import EditPost from '../../features/CreatePost/EditPost';
const ForumCard = (props) => {
    const title = props.title;
    const content = props.content;
    const tag = props.tag;
    const date = props.date;
    const nLikes = props.nLikes;
    const updatedDate = date.split("T")[0];
    const postIdselected = props.postId;
    //const postIdselected = "634b447487873860a7fdff48";
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
        <Card sx={{mb: 3, display: 'flex', justifyContent: 'space-between'}}>
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
           {
             props.editor &&
                <CardContent sx={{display: 'flex', flexFlow: 'column wrap', alignItems: 'flex-end'}}>
                    <IconButton ref={forumCardSettingsRef} onClick={() => toggleOpenEditorMenu(!openEditorMenu)}><Settings sx={{ color: 'black'}}/></IconButton>
                    { openEditorMenu && 
                        <ClickAwayListener onClickAway={() => toggleOpenEditorMenu(false)}>
                            <Paper>
                                <MenuList sx={{ width: 130 }} anchorEl={forumCardSettingsRef.current} 
                                    anchorOrigin={{
                                        horizontal: 'right',
                                        vertical: 'top'
                                        }}
                                    open={openEditorMenu}>
                                    <MenuItem sx={{display: 'flex', justifyContent: 'space-between'}} onClick={() => toggleOpenEditor(true)}>
                                        <div>EDIT</div> 
                                        <Edit/>
                                    </MenuItem>
                                    <MenuItem sx={{display: 'flex', justifyContent: 'space-between'}} >
                                        <div>DELETE</div> 
                                        <Delete/>
                                    </MenuItem>
                                </MenuList>
                            </Paper>
                        </ClickAwayListener>
                    }
                </CardContent>
             
           }
        </Card>
      //  </PostContext.Provider>
    )

}

export default ForumCard;