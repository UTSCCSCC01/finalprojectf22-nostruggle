import { Card, CardContent, Typography } from "@mui/material";

const CommentCard = (props) => {
    const content = props.content;
    const created_by = props.created_by;
    const date = props.date;

    return(
        <Card>
            <CardContent>
                <Typography>
                    {content}
                </Typography>
                <Typography>
                    {created_by}
                </Typography>
                <Typography>
                    {date}
                </Typography>
            </CardContent>
        </Card>

    )
   
}

export default CommentCard;