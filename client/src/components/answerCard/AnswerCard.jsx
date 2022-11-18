import { Card, Typography, CardContent, Accordion, AccordionSummary, AccordionDetails, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import ApiCall from '../api/ApiCall';
import { useUserState } from '../../features/SignUp/UserContext';
import { useState } from 'react';

const AnswerCard = (props) =>{
    const navigate = useNavigate()
    const child_of = props.child_of;
    const [commentError, setCommentError] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const ansId = props.ansId;
    const { userState, setUserState } = useUserState();
    const content = props.content;
    const created_by = props.created_by;
    const nLikes = props.nLikes;
    const created_At = props.created_At;
    const date = created_At.split("T")[0];
    const [commentData, setCommentData] = useState({
        content: "default",
        created_by:  userState.user.username,
        nLikes: 0,
        created_At: Date.now,
        comment_of: ansId
    })

    const onCommentSubmit = async() => {
        console.log(commentData);
        await ApiCall.post('/comment/post', commentData)
        .then(res => console.log(res.data))
        .catch(e => {
            console.log(e)
            setCommentError(true);   
        })
        setCommentContent('');
        setCommentData(previousState => {return {...previousState, content: ''}});
    }

    const editCommentField = (event) => {
        setCommentError(false);
        console.log(event.target.value);
        setCommentContent(event.target.value);
        setCommentData(previousState => {return {...previousState, content: event.target.value}})
    }

    return(
        <Accordion sx={{mb: 3}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
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