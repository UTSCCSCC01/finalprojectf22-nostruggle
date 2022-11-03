import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import ApiCall from '../../../components/api/ApiCall'
import { convertSecondsToString } from '../../Todo/StudyTimer/constants'
import { useUserState } from '../../SignUp/UserContext'
const DashboardStatistics = () => {

    const [ statistics, setStatistics ] = useState([])
    const { userState } = useUserState()

    const getForumStats = async () => {
        let forumStats = []
        await ApiCall.get('/forumPosts/get')
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
        await ApiCall.get(`/tasks?userId=${userState.user._id}`)
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

    useEffect(() => {
        getStats()
    }, [])

    return (
        <div>
            <Typography variant='h6'>
                {userState.user.username}
            </Typography>
            <Typography variant='subtitle1'>
                { statistics.join(' ~ ')}
            </Typography>
        </div>
    )
}

export default DashboardStatistics