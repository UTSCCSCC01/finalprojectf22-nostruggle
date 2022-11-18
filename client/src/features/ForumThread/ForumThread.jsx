import { TextField, Button, ListItem } from '@mui/material';
import ForumCard from '../../components/forumCard/ForumCard';
import { useEffect, useState } from 'react'
import ApiCall from "../../components/api/ApiCall";
import { useUserState } from '../SignUp/UserContext';
import { useParams } from 'react-router-dom';
import ForumPostCard from '../../components/ForumPostCard/ForumPostCard';
import AnswerCard from '../../components/answerCard/AnswerCard';

function ForumThread(){

    const {postId} = useParams();
    console.log(postId);
    const [contentFilled, setContentFilled] = useState(true);
    const [answerField, setAnswerField] = useState("");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [tag, setTag] = useState("");
    const [nLikes, setNLikes] = useState(0);
    const [postIdData, setPostIdData] = useState("");
    const [created_by, setCreatedBy] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    const [answers, setAnswers] = useState([]);

    //const [answerData, setAnswerDat]

    //const [postData, setPostData] = useState([]);
    let postData = {};

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
        .then(res => {
            console.log(res.data); 
            console.log("add new answer to database");
            setAnswerField("");
        })
        .catch(e => {console.log(e)
            setContentFilled(false);
        
        })
        getAnswers();
    }

    const setPostInfo = () =>{
        setTitle(postData.title);
        setContent(postData.content);
        setTag(postData.tags);
        setDate(postData.created_At);
        setCreatedBy(postData.created_by);
        setNLikes(postData.nLikes);
        setPostIdData(postData._id);
        setUpdatedAt(postData.updated);
        console.log("date is " + postData.created_At);
        console.log("title is" + postData.title);
    }

    const getAnswers = async () => {
        console.log("getting answers");
        await ApiCall.get('/postThread/answers/' + postId + '/')
        .then(res => {
            console.log(res.data);
            console.log("getting answers123");
            setAnswers(res.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const getPostById = async () => {
        console.log('postid is    ' + postId);
        console.log('/postThread/'+ postId + '/');
        await ApiCall.get('/postThread/'+ postId + '/')
        .then(res => {
            console.log(res.data);
            postData = res.data;
            console.log(postData);
            
            setPostInfo();
        })
        .catch(e => {
            console.log(e);
        })

    }
    useEffect(() => {

        getPostById();
        getAnswers();
        console.log("these are the answers" + answers);

    }, []);

    console.log('postid is' + postId);

    return(
        <div>
         
        <ForumPostCard refresh={getPostById} editor={created_by === userState.user.username} title={title} content={content} tag={tag} date={date} nLikes={nLikes} 
        created_by={created_by} updatedAt={updatedAt} postIdData={postIdData}/>
         
       
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
        value={answerField}
        ></TextField>

        <Button onClick={submitAnswer} >Post Answer</Button>


        <p>{answers.map((item) => <AnswerCard child_of={postIdData} content={item.content} created_by={item.created_by} nLikes={item.nLikes} 
        created_At={item.created_At} />)}</p>
        </div>

       

    )

}

export default ForumThread;