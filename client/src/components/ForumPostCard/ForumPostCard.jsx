import { Card, Typography, CardContent, Chip, Paper,
     IconButton, MenuList, MenuItem, ClickAwayListener } from '@mui/material';
import { Delete, Settings, Edit } from '@mui/icons-material';
import { useState, useRef } from 'react';
import EditPost from '../../features/CreatePost/EditPost';
import { useUserState } from '../../features/SignUp/UserContext';
import { useNavigate } from 'react-router-dom';
import ApiCall from '../api/ApiCall';
const ForumPostCard = (props) =>{
    const title = props.title;
    const content = props.content;
    const tag = props.tag;
    const date = props.date;
    const nLikes = props.nLikes;
    const updatedDate = date.split("T")[0];
    const postId = props.postIdData;
    const created_by = props.created_by;
    const updatedAt = props.updatedAt ? props.updatedAt.slice(0, 10) : undefined

    const forumCardSettingsRef = useRef();
    const navigate = useNavigate();
    const {userState, setUserState} = useUserState();

    const [ openEditor, toggleOpenEditor ] = useState(false)
    const [ openEditorMenu, toggleOpenEditorMenu ] = useState(false)

    console.log("date" + date);

    
    const onSubmit = () => {
        toggleOpenEditor(false)
        props.refresh()
    }

    const deletePost = () => {
        const confirm = window.confirm("Are you sure you would like to delete this post?")
        if (confirm) {
            ApiCall.delete(`/forumPosts/${postId}`)
            .then( (res) => {
                if (res.status === 200) {
                    navigate('/postThread/deleted')
                }
            })

        }
    }

    return(
        <Card sx={{mb: 3, display: 'flex', justifyContent: 'space-between'}}>
            <CardContent>
                <Typography variant="h5" sx={{fontWeight: "bold"}}>
                    {title}
                </Typography>
                <Typography variant="body1" sx={{fontWeight: "regular"}}>
                    {content}
                </Typography>
                <Typography>
                    {updatedDate}
                </Typography>
                <Typography>
                    created by: {created_by}
                </Typography>
                <Typography>
                    nLikes: {nLikes}
                </Typography>
                <Chip label={tag}></Chip>
            </CardContent>
                <CardContent sx={{display: 'flex', flexFlow: 'column wrap', justifyContent: props.editor ? 'space-between' : 'flex-end', alignItems: 'flex-end'}}>
                    {
                        props.editor &&
                        <div style={{display: 'flex', flexFlow: 'column wrap', alignItems: 'flex-end'}}>
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
                                            <MenuItem sx={{display: 'flex', justifyContent: 'space-between'}} onClick={deletePost}>
                                                <div>DELETE</div> 
                                                <Delete/>
                                            </MenuItem>
                                        </MenuList>
                                    </Paper>
                                </ClickAwayListener>
                            }
                            <EditPost 
                            open={openEditor} 
                            postId={postId}
                            title={title}
                            tag={tag}
                            content={content} 
                            onCancel={() => toggleOpenEditor(false)}
                            onSubmit={onSubmit}
                            />
                        </div>
                    }
                    { updatedAt && <div>Edited: {updatedAt}</div>}
                </CardContent>
        </Card>
    )
    

}

export default ForumPostCard;