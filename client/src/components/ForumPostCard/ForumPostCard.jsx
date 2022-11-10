import { Card, Typography } from '@mui/material';



const ForumPostCard = (props) =>{
    const title = props.title;
    const content = props.content;
    const tag = props.tag;
    const date = props.date;
    const nLikes = props.nLikes;
    const updatedDate = date.split("T")[0];
    const postId = props.postId;
    const created_by = props.created_by;

    return(
        <Card>
            <CardContent>
                <Typography variant="h5" sx={{fontWeight: "bold"}}>
                    {title}
                </Typography>
                <Typography variant="body1" sx={{fontWeight: "regular"}}>
                    {content}
                </Typography>
                <Typography>
                    {updatedDate}
                </Typography>
                <Typography>
                    created by: {created_by}
                </Typography>
                <Typography>
                    nLikes: {nLikes}
                </Typography>
                <Chip label={tag}></Chip>
            </CardContent>
        </Card>
    )
    

}

export default ForumPostCard;