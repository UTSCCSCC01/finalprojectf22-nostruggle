import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Typography, Grid } from "@mui/material"
import { convertSecondsToString } from "../Todo/StudyTimer/constants"
import ApiCall from "../../components/api/ApiCall"
const Profile = () => {

    const { username } = useParams()
    const [ user, setUser ] = useState()
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

    useEffect(() => {
        getStats()
    }, [user])
    useEffect(() => {
        getUserInfo()
    }, [])
    return (
        <div>
            { 
                user &&
                <div>
                    <h1>{username}'s profile</h1>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item xs={6}>
                            <Typography variant='subtitle1'>
                                { statistics.map((stat) => (
                                    <li>{stat}</li>
                                ))}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            Date joined: {user.createdAt}
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    )
}

export default Profile