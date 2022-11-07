import { Paper } from "@mui/material"
import { formatComment } from "./utils"
const NotificationCard = ({notif, size}) => {
    return (
        <Paper elevation={2} sx={{ padding: size === 'thin' ? 1 : 2}}>
            { formatComment(notif)}
        </Paper>
    )
}

export default NotificationCard