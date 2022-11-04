import { Grid } from "@mui/material"

import DashboardCard from "../components/dashboard/DashboardCard"
import { useState } from "react"
import { dashboardItems } from "../features/Dashboard/constants"
const Dashboard = () => {

    return (
        <div>
            <Grid container justifyContent='center' alignItems='center' direction='row'>
                    <Grid container spacing={2}>
                    {
                        dashboardItems.map((item) => (
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