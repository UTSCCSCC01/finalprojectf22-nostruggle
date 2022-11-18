import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { Typography, Grid, Card, TextField, Button } from "@mui/material"
import { Edit } from "@mui/icons-material"
import { convertSecondsToString } from "../Todo/StudyTimer/constants"
import ApiCall from "../../components/api/ApiCall"
import { useUserState } from '../SignUp/UserContext';
import ForumCard from "../../components/forumCard/ForumCard"
const Profile = () => {

    const { username } = useParams()
    const [ user, setUser ] = useState()
    const { userState } = useUserState()
    const newAboutMeRef = useRef()
    const [ aboutMe, setAboutMe ] = useState({edit: false, content: ''})
    const [ posts, setPosts ] = useState([])
    const [ answers, setAnswers ] = useState([])
    const [ statistics, setStatistics ] = useState([])

    const getForumStats = async () => {
        let forumStats = []
        await ApiCall.get(`/forumPosts/get?created_by=${username}`)
        .then( res => {
            console.log(res)
            if (res.data){
                const forumPosts = res.data
                const numPosts = forumPosts.length
                const numLikes = forumPosts.reduce((prev, current) => prev + current.nLikes, 0)
                forumStats.push(`${numPosts} forum post(s)`)
                forumStats.push(`${numLikes} forum like(s)`)
            }
        })
        return forumStats
    }

    const getTodolistStats = async () => {
        let todoStats = []
        await ApiCall.get(`/tasks?userId=${user._id}`)
        .then( res => {
            if (res.status === 200){
                const tasks = res.data
                const numCompletedTasks = tasks.filter((task) => task.done).length
                const numIncompleteTasks = tasks.filter((task) => !task.done).length
                const lifetimeStudyingTime = tasks.reduce((prev, current) => prev + current.timespent, 0)
                todoStats.push(`${numCompletedTasks} completed task(s)`)
                todoStats.push(`${numIncompleteTasks} incomplete task(s)`)
                todoStats.push(`${convertSecondsToString(lifetimeStudyingTime)} total studying logged`)
            }
        })
        return todoStats
    }

    const getStats = async () => {
        const forumStats = await getForumStats()
        const todoStats = await getTodolistStats()
        setStatistics(forumStats.concat(todoStats))
    }

    const getUserInfo = async () => {
        await ApiCall(`/users/username/${username}`)
        .then (res => {
            if (res.status === 200) {
                const user = res.data[0]
                if (user) {
                    setUser(user)

                }                
            }
        })
    }

    const getAboutMe = async () => {
        await ApiCall.get(`/users/aboutme/${username}`)
        .then (res => {
            if (res.status === 200) {
                const a = res.data[0]
                setAboutMe({...aboutMe, content: a.content, edit: false})               
            }
        })
    }

    const saveAboutMe = async () => {
        const newContent = newAboutMeRef.current.value
        const newAboutMe = {
            username: username,
            content: newContent
        }
        await ApiCall.put(`/users/aboutme/${username}`, newAboutMe)
        .then ((res) => {
            console.log(res)
            getAboutMe()
        })
    }

    const getPosts = async () => {
        await ApiCall.get(`/forumPosts/get?created_by=${username}`)
        .then( res => {
            if (res.status === 201) {
                console.log(res.data)
                setPosts(res.data)
            }
        })
    }

    const getAnswers = async () => {
        await ApiCall.get(`/answers/query?created_by=${username}`)
        .then( res => {
            if (res.status === 201) {
                console.log(res.data)
                setAnswers(res.data)
            }
        })
    }

    useEffect(() => {
        if ( user ) {
            getStats()
            getPosts()
            getAnswers()
        }
    }, [user])
    useEffect(() => {
        getUserInfo()
        getAboutMe()
    }, [])
    return (
        <div>
            { 
                user &&
                <div>
                    <Typography variant='h3'>
                        {username}'s profile
                    </Typography>                    
                    <Grid container justifyContent={'space-between'} spacing={2}>
                        <Grid item xs={6}>
                            <Card sx={{ height: 200}}>
                                <Typography variant='h4'>
                                    About me
                                </Typography>
                                {
                                    aboutMe.edit ?
                                        <div>
                                            <TextField sx={{ width: '100%'}} inputRef={newAboutMeRef} defaultValue={aboutMe.content} />
                                            <Button onClick={() => setAboutMe({...aboutMe, edit: false})}>Cancel</Button>
                                            <Button onClick={saveAboutMe}>Save</Button>
                                        </div>
                                    : <Typography variant='subtitle1'>
                                        {aboutMe.content}
                                        { userState.user.username === username && <Button onClick={() => setAboutMe({...aboutMe, edit: true})}><Edit size="small" /></Button> }
                                    </Typography>
                                }
                                
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <Typography variant='subtitle1'>
                                    { statistics.map((stat) => (
                                        <li>{stat}</li>
                                    ))}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <Typography variant="h4">{username}'s Posts</Typography>
                                {
                                    posts.map(post => (
                                        <ForumCard {...post} tag={post.tags} date=""/>
                                    ))
                                }        
                            </Card>
                                    
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <Typography variant="h4">{username}'s Answers</Typography>
                                {
                                    answers.map(answer => (
                                        <ForumCard {...answer} tag={answer.tags} date=""/>
                                    ))
                                } 
                            </Card>     
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    )
}

export default Profile