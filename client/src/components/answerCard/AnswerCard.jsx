import { Card, Typography, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const AnswerCard = (props) =>{
    const navigate = useNavigate()
    const child_of = props.child_of;
    const content = props.content;
    const created_by = props.created_by;
    const nLikes = props.nLikes;
    const created_At = props.created_At;
    const date = created_At.split("T")[0];


    return(
        <Card sx={{mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
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
            {
                props.goToPost &&
                <CardContent>
                    <Button variant="outlined" onClick={() => navigate(`/postThread/${child_of}`)}>VIEW POST</Button>
                </CardContent>

            }
        </Card>
    )
}

export default AnswerCard;