import { set } from "mongoose";

function AnswerField(){
    const [answer, setAnswer] = useState("");

    const enterAnswer = (event) =>{
        setAnswer(event.target.value)
    }

    return(
        <TextField
        id="Add a new Answer" 
        label="Add a new Answer" 
        variant="outlined"
        error={!titleFilled}
        helperText={!titleFilled ? "Please type an answer before submitting" : ""}
        onChange={enterAnswer}
        />



    )


}

export default AnswerField;