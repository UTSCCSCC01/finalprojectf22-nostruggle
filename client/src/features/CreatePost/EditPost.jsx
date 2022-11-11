import { Button, Modal, Chip, TextField, Box, Grid, Typography } from "@mui/material"
import { useState } from "react"
import { tags } from "../Forum/constants"
const EditPost = ({ open, title, tag, content, onCancel, onSubmit }) => {

    const [ selectedTag, setSelectedTag ] = useState(tag)

    return (
        <Modal sx={{ zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center' }} open={open}>
            <Box sx={{ padding: 3, width: 400, borderRadius: 5, backgroundColor: 'white'}} onClose={() => {}}> 
                <span><b>Edit Post</b></span>

                <h1 style={{ marginTop: 0, marginBottom: 20}}>{title}</h1>

                <TextField 
                id="content" 
                label="Content of Post" 
                variant="outlined"
                fullWidth={true}
                multiline={true}
                helperText={!true ? "Please enter content for the post" : ""}
                rows={8}
                defaultValue={content}
                onChange={() => {}}
                /> 
                <div style={{ marginBottom: 15, marginTop: 10, display: 'flex', flexFlow: 'row wrap' }}>
                    <Typography variant='subtitle1' fontWeight={700} marginRight={1}>Tag: </Typography>
                    { tags.map((tagOption) => <Chip label={ tagOption } size='small' color={tagOption === selectedTag ? "primary": "default"} onClick={ () => setSelectedTag(tagOption)}/>)}
                </div>

                <Grid container justifyContent='space-between'>
                    <Button color='info' item onClick={onCancel} variant="contained">CANCEL</Button>
                    <Button color='success' item onClick={onSubmit} variant="contained">SAVE CHANGES</Button>
                </Grid>
            </Box>
        </Modal>
    )
}

export default EditPost