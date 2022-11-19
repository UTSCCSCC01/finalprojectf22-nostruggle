import { Card, Typography, CardContent, Accordion, AccordionSummary, AccordionDetails, TextField, Button, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import ApiCall from '../api/ApiCall';
import { useUserState } from '../../features/SignUp/UserContext';
import { useState } from 'react';
import { sendNotification } from '../../features/Notifications/utils';
import CommentCard from '../CommentCard/CommentCard';
import { useEffect } from 'react';
import { ThumbUp } from '@mui/icons-material';

const AnswerCard = (props) =>{
    const navigate = useNavigate()
    const hideReply = props.hideReply;
    const child_of = props.child_of;
    const [commentError, setCommentError] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const ansId = props.ansId;
    const { userState, setUserState } = useUserState();
    const content = props.content;
    const created_by = props.created_by;
    const [nLikes, setNLikes] = useState(props.nLikes);
    const created_At = props.created_At;
    const date = created_At.split("T")[0];
    const likedBy = props.likedBy;
    const [commentData, setCommentData] = useState({
        content: "",
        created_by:  userState.user.username,
        nLikes: 0,
        created_At: Date.now,
        comment_of: ansId
    })
    const [comments, setComments] = useState([]);

    const onCommentSubmit = async() => {
        console.log(commentData);
        await ApiCall.post('/comment/post', commentData)
        .then(res => {
            console.log(res.data);
            getComments()
        })
        .catch(e => {
            console.log(e)
            setCommentError(true);   
        })
        setCommentContent('');
        setCommentData(previousState => {return {...previousState, content: ''}});
        if (created_by !== userState.user.username) {
            ApiCall.get(`users/username/${created_by}`)
            .then( res => {
                if (res.status === 200){
                    const answerAuthor = res.data[0]
                    ApiCall.get(`/forumPosts/${child_of}`)
                    .then (r => {
                        if (r.status === 201){
                            const forumPost = r.data;
                            console.log(forumPost)
                            sendNotification('comment', forumPost._id, forumPost.title, userState.user.username, answerAuthor._id)
                        }
                    })
                }
            })
        }

    }

    const editCommentField = (event) => {
        setCommentError(false);
        console.log(event.target.value);
        setCommentContent(event.target.value);
        setCommentData(previousState => {return {...previousState, content: event.target.value}})
    }

    const getComments = async() => {
        await ApiCall.get('/comment/get/' + ansId)
        .then(res => {
            console.log(res.data)
            setComments(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }


    const likeAnswer = async () => {
        if(!(likedBy.includes(userState.user.username))){
            console.log(likedBy.length)
            likedBy.push(userState.user.username)
        }
        else{
            let index = likedBy.indexOf(userState.user.username);
            likedBy.splice(index, 1);
        }
        let length = likedBy.length;
        const changes = {
            nLikes: length,
            likedBy: likedBy
        }
        setNLikes(length);

        await ApiCall.patch('/postThread/' + ansId, changes)
        .then(res => {
            getComments();
            console.log(res.data)
        })
        .catch(e => (console.log(e)))

        //setLikedByUser(!likedByUser);

        

    }

    useEffect(() => {
        getComments();
    }, []);

    return( 
        
            hideReply ? 
            <Card>
            <CardContent>
                <Typography>
                    {content}
                </Typography>
                <Typography>
                    {created_by}
                </Typography>
                <Typography>
                    Num Likes:{likedBy.length}
                </Typography>
                <Typography>
                    {date}
                </Typography>
            </CardContent>
            {
                props.goToPost &&
                <CardContent>
                    <Button variant="outlined" onClick={() => navigate(`/postThread/${child_of}`)}>VIEW POST</Button>
                </CardContent>

            }
            </Card>
        :
        <Accordion sx={{mb: 3}}>
            <AccordionSummary expandIcon={ <ExpandMoreIcon/>}>
            <Card>
                <CardContent>
                    <Typography>
                        {content}
                    </Typography>
                    <Typography>
                        {created_by}
                    </Typography>
                    <Typography>
                        Num Likes:{nLikes}
                    </Typography>
                    <Typography>
                        {date}
                    </Typography>
                    <IconButton>
                        <ThumbUp color={likedBy.includes(userState.user.username) ? "primary" : "default"} onClick={likeAnswer}/>
                    </IconButton>
                </CardContent>
                {
                    props.goToPost &&
                    <CardContent>
                        <Button variant="outlined" onClick={() => navigate(`/postThread/${child_of}`)}>VIEW POST</Button>
                    </CardContent>

                }
            </Card>
            </AccordionSummary>
            
            <AccordionDetails>
                <h5>Comment Section</h5>

                {comments.map((item) => <CommentCard content={item.content}
                created_by={item.created_by} created_At={item.created_At}/>)}

                <TextField
                id="content" 
                label="Add a new comment" 
                variant="outlined"
                fullWidth={true}
                multiline={true}
                maxRows={5}
                error={commentError}
                onChange={editCommentField}
                helperText={commentError ? "Comment is missing" : ""}
                value={commentContent}
                ></TextField>

                <Button onClick={onCommentSubmit}>Add comment</Button>
            </AccordionDetails>
        </Accordion>
    )
}

export default AnswerCard;