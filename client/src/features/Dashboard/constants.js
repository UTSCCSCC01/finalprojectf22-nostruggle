import Forum from "../Forum/Forum"
import Deadline from "../Todo/Deadline"
import DashboardStatistics from "./Content/DashboardStatistics"
import StudyTimerSummary from "../Todo/StudyTimer/Summary/StudyTimerSummary"
import DashboardTimeSummary from "./Content/DashboardTimeSummary"
import DashboardUpdates from "./Content/DashboardUpdates"
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
        content: <><h1>Welcome back!</h1><DashboardStatistics/></>,
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
        content: <DashboardUpdates/>,
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
            header: '#DED6FF',
            headerOutline: '#947BFA'
        },
        title: "Deadlines",
        content: <Deadline/>,
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