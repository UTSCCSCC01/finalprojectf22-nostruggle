import DashboardCard from "../components/dashboard/DashboardCard"
import { useState } from "react"
const Dashboard = () => {

    const [ dashboardItems, setDashboardItems ] = useState(['Tasks', 'Complete', 'Deadlines'])

    return (
        <div>
            {
                dashboardItems.map((item) => (
                    <DashboardCard title={item}/>
                ))
            }

        </div>
    )
}

export default Dashboard