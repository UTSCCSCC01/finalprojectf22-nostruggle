import { TextField } from '@mui/material';

const PasswordField = (props) => {
    return (
        <TextField
        { ...props.innerRef }
        label='password'
        type='password'
        error={ props.errMsg !== '' }
        helperText={ props.errMsg }
        />
    )
}

export default PasswordField