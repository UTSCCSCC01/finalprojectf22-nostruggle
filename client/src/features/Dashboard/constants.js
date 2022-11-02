import Forum from "../Forum/Forum"
import Scheduler from "../Todo/Scheduler"
import StudyTimerSummary from "../Todo/StudyTimer/Summary/StudyTimerSummary"
import DashboardTimeSummary from "./Content/DashboardTimeSummary"
export const dashboardItems = [
    {
        dimensions: {
            xs: 12
           
        },
        color: {
            header: '#D3F8F4',
            headerOutline: '#009962'
        },
        title: "Welcome back!",
        content: <h1>Welcome back!</h1>,
        link: {
            title: 'View your profile',
            path: '/profile'
        }
    },
    {
        dimensions: {
            xs: 12
           
        },
        color: {
            header: '',
            headerOutline: 'gray'
        },
        title: "Recent Activity",
        content: "Hi",
        link: {
            title: 'View Forum',
            path: '/forum'
        }
    },
    {
        dimensions: {
            xs: 12
           
        },
        color: {
            header: '',
            headerOutline: 'gray'
        },
        title: "Forum Posts",
        content: <Forum />,
        link: {
            title: 'View Forum',
            path: '/forum'
        }
    },
    {
        dimensions: {
            xs: 12,
            sm: 6,
            md: 4
        },
        color: {
            header: 'red',
            headerOutline: '#009962'
        },
        title: "Deadlines",
        content: <Scheduler/>,
        link: {
            title: 'View your todolist',
            path: '/todo'
        }
    },
    {
        dimensions: {
            xs: 12,
            sm: 6,
            md: 4
        },
        color: {
            header: '#C3FFC6',
            headerOutline: '#009962'
        },
        title: "To-Do",
        content: <Scheduler/>,
        link: {
            title: 'View your todolist',
            path: '/todo'
        }
    },
    {
        dimensions: {
            xs: 12,
            sm: 6,
            md: 4
        },
        color: {
            header: '#DED6FF',
            headerOutline: '#947BFA'
        },
        title: "Summary",
        content: <DashboardTimeSummary/>,
        link: {
            title: 'Full Summary',
            path: '/daily'
        }
    }
]