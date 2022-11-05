import { set } from "mongoose";

const AnswerField = (props) =>{
    const [answer, setAnswer] = useState("");

    const {contentFilled} = props.contentFilled;
    const enterAnswer = (event) =>{
        setAnswer(event.target.value)
    }

    const submitAnswer = async (event) => {
        if(answerField == ""){
            setContentFilled(false);
        }

        await ApiCall.post('answers/post', postAnswer)


    }

    return(
        <div>
        <TextField
            id="answer"
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

export default AnswerField;