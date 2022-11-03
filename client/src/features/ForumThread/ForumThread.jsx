import { TextField, Button } from '@mui/material';
import ForumCard from '../../components/forumCard/ForumCard';
import { useState } from 'react'
function ForumThread(){

    const [contentFilled, setContentFilled] = useState(true);
    const [answerField, setAnswerField] = useState("");

    const enterContent = (event) => {
        setAnswerField(event.target.value)
        setContentFilled(true);
    }

    const submitAnswer = () => {
        if(answerField == ""){
            setContentFilled(false);
        }
    }

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