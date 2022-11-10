import { Paper } from "@mui/material"
import { formatMessage } from "./utils"
const NotificationCard = ({notif, size, children}) => {

    return (
        <Paper elevation={2} sx={{ padding: size === 'thin' ? 1 : 2}}>
            <div>{children }</div>
        </Paper>
    )
}

export default NotificationCard