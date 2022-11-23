import { Grid } from "@mui/material"

import DashboardCard from "../components/dashboard/DashboardCard"
import { dashboardItems } from "../features/Dashboard/constants"
import { useUserState } from "../features/SignUp/UserContext"
const Dashboard = () => {
    const { userState } = useUserState()
    const items = dashboardItems(userState.user.username)
    return (
        <div>
            <Grid container justifyContent='center' alignItems='center' direction='row'>
                    <Grid container spacing={2}>
                    {
                        items.map((item) => (
                            <Grid item {...item.dimensions}>
                                <DashboardCard {...item} />
                            </Grid>

                        ))
                    }                   
                    </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard