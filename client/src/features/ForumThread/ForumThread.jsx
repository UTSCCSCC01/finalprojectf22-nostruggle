import { TextField, Button, ListItem } from '@mui/material';
import ForumCard from '../../components/forumCard/ForumCard';
import { useEffect, useState } from 'react'
import ApiCall from "../../components/api/ApiCall";
import { useUserState } from '../SignUp/UserContext';
import { useParams } from 'react-router-dom';
import ForumPostCard from '../../components/ForumPostCard/ForumPostCard';
import AnswerCard from '../../components/answerCard/AnswerCard';
import { sendNotification } from '../Notifications/utils'
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

    const [likedBy, setLikedBy] = useState([]);
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
        comments: [],
        likedBy: []
    })

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
            ApiCall.get(`users/username/${created_by}`)
            .then( res => {
                if (res.status === 200){
                    const author = res.data[0]
                    if (author._id !== userState.user._id) {
                        sendNotification('answer', postId, title, userState.user.username, author._id)
                    }
                }
            })
        })
        .catch(e => {console.log(e)
            setContentFilled(false);
            
        })
        getAnswers();
        setAnswerData(previousState => { return {...previousState, content: ''}})
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
        setLikedBy(postData.likedBy);
        console.log("likedby value is" + likedBy);
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
        created_by={created_by} updatedAt={updatedAt} postId={postIdData} likedBy={likedBy} getPostById={getPostById}
        getAnswers={getAnswers} setLikedBy={setLikedBy}/>
         
       
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
        sx={{mb: 2}}
        ></TextField>

        <Button onClick={submitAnswer} variant="contained">Post Answer</Button>


        <p>{answers.map((item) => <AnswerCard child_of={postIdData} content={item.content} created_by={item.created_by} nLikes={item.nLikes} 
        created_At={item.created_At} ansId={item._id} likedBy={item.likedBy}/>)}</p>
        </div>

       

    )

}

export default ForumThread;