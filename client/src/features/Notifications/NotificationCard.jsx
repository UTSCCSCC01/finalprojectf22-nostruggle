import { Paper } from "@mui/material"
import { formatMessage } from "./utils"
const NotificationCard = ({notif, size, elevation = 2}) => {

    return (
        <Paper elevation={elevation} sx={{ padding: size === 'thin' ? 1 : 2}}>
            <div>{notif }</div>
        </Paper>
    )
}

export default NotificationCard