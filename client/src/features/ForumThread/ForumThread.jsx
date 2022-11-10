import { TextField, Button } from '@mui/material';
import ForumCard from '../../components/forumCard/ForumCard';
import { useEffect, useState } from 'react'
import ApiCall from "../../components/api/ApiCall";
import { useUserState } from '../SignUp/UserContext';
import { useParams } from 'react-router-dom';

function ForumThread(){

    const {postId} = useParams();
    console.log(postId);
    const [contentFilled, setContentFilled] = useState(true);
    const [answerField, setAnswerField] = useState("");
    const [content, setContent] = useState("");
    //const [answerData, setAnswerDat]
    const {userState} = useUserState();
    const [answerData, setAnswerData] = useState({content: "",
        created_by: userState.user.username,
        nLikes: "0",
        created_At: { type: Date, default: Date.now},
        child_of: postId,
        comments: []})

    const enterContent = (event) => {
        setAnswerField(event.target.value)
        setContentFilled(true);
        setAnswerData(previousState => {return {...previousState, content: event.target.value}});
    }
    console.log(userState.postId);
    const submitAnswer = async (event) => {
        if(answerField == ""){
            setContentFilled(false);
        }

        await ApiCall.post('answers/post', answerData)
        .then(res => {console.log(res.data); console.log("add new answer to database")})
        .catch(e => {console.log(e)
            setContentFilled(false);
        
        })
    }
    useEffect(() => {
        const getPostById = async () => {
            console.log('postid is    ' + postId);
            console.log('/postThread/'+ postId + '/');
            await ApiCall.get('/postThread/'+ postId + '/')
            .then(res => {console.log(res.data)})
            .catch(e => {
                console.log(e);
            })

        }
        getPostById();
    })


    console.log('postid is' + postId);

    return(
        <div>
         <ForumCard title="Title" content="Content" tag="Computer Science" date="Monday" nLikes="5" />
       
        <TextField
        id="content" 
        label="Add a new answer" 
        variant="outlined"
        fullWidth={true}
        multiline={true}
        error={!contentFilled}
        helperText={!contentFilled ? "Please enter your answer" : ""}
        rows={8}
        onChange={enterContent}
        ></TextField>

        <Button onClick={submitAnswer} >Post Answer</Button>
        </div>
    )

}

export default ForumThread;