import { Card, CardHeader } from "@mui/material"

const DashboardCard = (props) => {
    return (
        <Card>
            <CardHeader>{props.title}</CardHeader>
            This is a card
        </Card>
    )
}

export default DashboardCard