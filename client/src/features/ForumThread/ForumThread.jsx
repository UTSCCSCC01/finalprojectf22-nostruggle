import { TextField, Button } from '@mui/material';
import ForumCard from '../../components/forumCard/ForumCard';
import { useEffect, useState } from 'react'
import ApiCall from "../../components/api/ApiCall";
import { useUserState } from '../SignUp/UserContext';
import { useParams } from 'react-router-dom';
import ForumPostCard from '../../components/ForumPostCard/ForumPostCard';

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
        .then(res => {console.log(res.data); console.log("add new answer to database")})
        .catch(e => {console.log(e)
            setContentFilled(false);
        
        })
    }

    const setPostInfo = () =>{
        setTitle(postData.title);
        setContent(postData.content);
        setTag(postData.tags);
        setDate(postData.created_At);
        setCreatedBy(postData.created_by);
        setNLikes(postData.nLikes);
        setPostIdData(postData._id);
        console.log("date is " + postData.created_At);
        console.log("title is" + postData.title);
    }

    useEffect(() => {
        const getPostById = async () => {
            console.log('postid is    ' + postId);
            console.log('/postThread/'+ postId + '/');
            await ApiCall.get('/postThread/'+ postId + '/')
            .then(res => {
                console.log(res.data);
               // setPostData(res.data);
                postData = res.data;
                console.log(postData);
                setPostInfo();
            })
            .catch(e => {
                console.log(e);
            })

        }
        getPostById();
        
    }, []);

  
// <ForumPostCard title={title} content={content} tag={tag} date={postData.created_At} nLikes={nLikes} 
//created_by={created_by} postIdData={postIdData}/>
    console.log('postid is' + postId);

    return(
        <div>
         
        <ForumPostCard title={title} content={content} tag={tag} date={date} nLikes={nLikes} 
        created_by={created_by} postIdData={postIdData}/>
         
       
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