import { Card, Chip, Typography, CardContent } from '@mui/material';

const AnswerCard = (props) => {
    const title = props.title;
    const content = props.content;
    const tag = props.tag;
    const date = props.date;
    const nLikes = props.nLikes;
    const updatedDate = date.split("T")[0];
    const created_by = props.created_by;

    return(
        <Card sx={{mb: 3}}>
            <CardContent>
                <Typography variant="h5" sx={{fontWeight: "bold"}}>
                    {title}
                </Typography>

                <Typography varient="body1" sx={{fontWeight: "regular"}}>
                    {content}
                </Typography>
                <Typography varient="body1" sx={{fontWeight: "regular"}}>
                    {updatedDate}
                </Typography>  
            
                <Typography varient="body1" sx={{fontWeight: "regular"}}>
                    Posted by: {created_by}
                </Typography>
                <Typography varient="body1" sx={{fontWeight: "regular"}}>
                    Likes: {nLikes}
                </Typography>

                <Chip label={tag}></Chip>
            </CardContent>

        </Card>
    )
}

export default AnswerCard;