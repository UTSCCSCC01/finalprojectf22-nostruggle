import { Card, CardContent, Typography } from "@mui/material";

const CommentCard = (props) => {
    const content = props.content;
    const created_by = props.created_by;
    const date = props.created_At.split("T")[0];

    console.log(props.date);

    return(
        <Card sx={{mb: 1}}>
            <CardContent>
                <Typography>
                    {content}
                </Typography>
                <Typography sx={{fontWeight: "bold", color:"primary.main"}}>
                    {created_by}
                </Typography>
                <Typography sx={{fontWeight: "bold"}}>
                    {date}
                </Typography>
            </CardContent>
        </Card>

    )
   
}

export default CommentCard;