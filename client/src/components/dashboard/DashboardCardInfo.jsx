import { Card, CardContent, CardHeader, Button, CardActions, CardActionArea } from "@mui/material"

import { useNavigate } from "react-router-dom"
const DashboardCardInfo = ({content, link, color}) => {

    const navigate = useNavigate()

    return (
        <div>    
            <CardContent sx={{maxHeight: '40vh', overflow: 'hidden'}} children={content}/>
            <CardActionArea>
                <Button variant='text' sx={{width: '100%', backgroundColor: color.header, color: color.headerOutline }} onClick={() => navigate(link.path)}>{link.title}</Button>
            </CardActionArea>
        </div>
    )
}

export default DashboardCardInfo