import { Card, Typography, CardContent, Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AnswerCard = (props) =>{

    const content = props.content;
    const created_by = props.created_by;
    const nLikes = props.nLikes;
    const created_At = props.created_At;
    const date = created_At.split("T")[0];


    return(
        <Accordion sx={{mb: 3}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
        <Card>
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
        </AccordionSummary>
        <AccordionDetails>
            <h5>Comment Section</h5>
            <TextField
            id="content" 
            label="Add a new comment" 
            variant="outlined"
            fullWidth={true}
            multiline={true}
        ></TextField>
        </AccordionDetails>
        </Accordion>
    )
}

export default AnswerCard;