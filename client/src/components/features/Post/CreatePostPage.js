
import { TextField, Button, Chip } from "@mui/material";

function CreatePostPage(){

    const handleClick = (event) => {

    }




    return (
        <div>
            <p>
                <h1> Add a New Post</h1>
                <TextField 
                id="postTitle" 
                label="Title of Post" 
                variant="outlined"
                fullWidth="true"
                />
            </p>

            <p>
                <TextField 
                id="postContent" 
                label="Content of Post" 
                variant="outlined"
                fullWidth="true"
                multiline="true"
                /> 
            </p>
            <h3>Select tags:</h3>
            <p>
            <Chip 
                label="Advice"
                onClick={handleClick}
            />
             <Chip 
                label="Homework Help"
                onClick={handleClick}
            />
            <Chip 
                label="Computer Science"
                onClick={handleClick}
            />
            <Chip 
                label="Linear Algebra"
                onClick={handleClick}
            />
             <Chip 
                label="Calculus"
                onClick={handleClick}
            />
            </p>



            <Button variant="contained">POST</Button>

        </div>
        
    );
}

export default CreatePostPage;