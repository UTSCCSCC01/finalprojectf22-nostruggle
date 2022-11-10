import { Paper } from "@mui/material"
import { formatMessage } from "./utils"
const NotificationCard = ({notif, size}) => {

    return (
        <Paper elevation={2} sx={{ padding: size === 'thin' ? 1 : 2}}>
            <div>{notif }</div>
        </Paper>
    )
}

export default NotificationCard