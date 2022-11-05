import AnswerField from "../../components/answerField/AnswerField"
import ForumCard from "../../components/forumCard/ForumCard"

function PostThread() {
    const [answer, setAnswer] = useState("");

    const enterAnswer = (event) =>{
        setAnswer(event.target.value)
    }

    const onClick = () => {
        
    }


    return(
        <div>
            <ForumCard/>

            <TextField
            id="Add a new Answer" 
            label="Add a new Answer" 
            variant="outlined"
            error={!titleFilled}
            helperText={!titleFilled ? "Please type an answer before submitting" : ""}
            onChange={enterAnswer}
            />
            <AnswerField/>

            <Button onClick={submit}>Submit</Button>
        </div>
    )
}