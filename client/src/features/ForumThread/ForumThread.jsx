import { TextField, Button } from '@mui/material';
import ForumCard from '../../components/forumCard/ForumCard';
import { useState } from 'react'
import ApiCall from "../../components/api/ApiCall";

function ForumThread(){

    const [contentFilled, setContentFilled] = useState(true);
    const [answerField, setAnswerField] = useState("");
   // const [answerData, setAnswerData] = useState({id: 123};
    //const [answerData, setAnswerDat]

    const enterContent = (event) => {
        setAnswerField(event.target.value);
        setContentFilled(true);
    }


    const submitAnswer = async (event) => {
        if(answerField == ""){
            setContentFilled(false);
        }

        await ApiCall.post('answers/post', postAnswer)


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