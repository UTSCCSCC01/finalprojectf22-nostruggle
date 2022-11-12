import { Button, Modal, Chip, TextField, Box, Grid, Typography } from "@mui/material"
import { useState } from "react"
import { tags } from "../Forum/constants"
import ApiCall from "../../components/api/ApiCall"
const EditPost = ({ open, postId, title, tag, content, onCancel, onSubmit}) => {

    const [ selectedTag, setSelectedTag ] = useState(tag)
    const [ newContent, setNewContent ] = useState(content)

    const submitEdit = async () => {
        if (!newContent.trim()) {
            return
        }
        const edits = {
            content: newContent,
            tags: selectedTag,
            updated: new Date(Date.now())
        }
        await ApiCall.patch(`/forumPosts/${postId}`, edits)
        .then((res) => res.status === 200 ? onSubmit() : alert("There was a problem saving your edit."))
    } 

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
                onChange={(e) => setNewContent(e.target.value)}
                /> 
                <div style={{ marginBottom: 15, marginTop: 10, display: 'flex', flexFlow: 'row wrap' }}>
                    <Typography variant='subtitle1' fontWeight={700} marginRight={1}>Tag: </Typography>
                    { tags.map((tagOption) => <Chip label={ tagOption } size='small' color={tagOption === selectedTag ? "primary": "default"} onClick={ () => setSelectedTag(tagOption)}/>)}
                </div>

                <Grid container justifyContent='space-between'>
                    <Button color='info' item onClick={onCancel} variant="contained">CANCEL</Button>
                    <Button color='success' item onClick={submitEdit} variant="contained">SAVE CHANGES</Button>
                </Grid>
            </Box>
        </Modal>
    )
}

export default EditPost