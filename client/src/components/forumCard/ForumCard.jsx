
import { Typography, CardContent, Card, Box, Chip, Item, Button} from '@mui/material';
import { useState } from 'react';
const ForumCard = (props) => {
    const title = props.title;
    const content = props.content;
    const tag = props.tag;
    const date = props.date;
    const nLikes = props.nLikes;
    const updatedDate = date.split("T")[0];
   

/*
<Box sx = {{ display: 'grid', gridAutoColumns: '1fr', gap: 1}}
                    <Box sx ={{gridRow: '1', gridColumn: 'span 2'}}>1</Box>
                    <Box sx ={{gridRow: '1', gridColumn: '4 / 5'}}>2</Box>
                    <Box sx ={{gridRow: '1', gridColumn: '4 / 5'}}>3</Box>
                    </Box>
*/
    return (
        <Card sx={{mb: 3}}>
            <CardContent>
                <Typography variant="h5" sx={{fontWeight: "bold"}}>
                    {title}
                </Typography>
                <Typography variant="body1" sx = {{fontWeight: "regular"}}>
                    {content}
                </Typography>
                
                <Typography>
                    {updatedDate}       
                </Typography>  
                <Typography>     
                    Likes: {nLikes}
                </Typography>
            
                <Chip label={tag}></Chip>
                <Button variant="outlined" >View Post</Button>
            </CardContent>


        </Card>
    )

}

export default ForumCard;