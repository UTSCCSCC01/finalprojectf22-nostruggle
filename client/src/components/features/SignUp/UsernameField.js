import { TextField } from "@mui/material";

const UsernameField = (props) => {
    return (
        <TextField
        { ...props.innerRef }
        label="username"
        error={ props.errMsg !== "" }
        />
    )
}

export default UsernameField