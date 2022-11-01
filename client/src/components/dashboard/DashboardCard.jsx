import { Card, CardContent, CardHeader } from "@mui/material"

import DashboardCardInfo from "./DashboardCardInfo"
import './DashboardCard.css'
const DashboardCard = (props) => {
    return (
        <Card variant='elevation' className='DashboardCard'>
            <CardHeader sx={{ border: '1px solid', backgroundColor: props.color.header, borderColor: props.color.headerOutline } } titleTypographyProps={{fontWeight: 700}} title={props.title}/>
            <DashboardCardInfo color={props.color} link={props.link} content={props.content}/>
        </Card>
    )
}

export default DashboardCard