import { Card, Typography, CardContent } from '@mui/material';

const AnswerCard = (props) =>{

    const content = props.content;
    const created_by = props.created_by;
    const nLikes = props.nLikes;
    const created_At = props.created_At;
    const date = created_At.split("T")[0];


    return(
        <Card sx={{mb: 3}}>
            <CardContent>
                <Typography>
                    {content}
                </Typography>
                <Typography>
                    {created_by}
                </Typography>
                <Typography>
                    Num Likes:{nLikes}
                </Typography>
                <Typography>
                    {date}
                </Typography>
            </CardContent>

        </Card>
    )
}

export default AnswerCard;