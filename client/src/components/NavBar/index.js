import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Tooltip, Button, IconButton, Avatar } from "@mui/material";

import UserMenu from "./UserMenu";
import './NavBar.css'

const NavBar = (props) => {

    const pages = ['Home', 'Discover'];
    const [ open, setOpen ] = useState(false);
    
    const showPage = (page) => {
        return (
            <Tooltip title={ 'Open ' + page } key={ page }>
                <span>
                    <Button
                    disabled={ props.active === page }
                    sx={{ color: 'white' }}
                    >{ page }</Button>
                </span>
            </Tooltip>
        )
    };

    return (
        <>
            <AppBar position='static'>
                <span>
                    <Toolbar>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        { pages.map((page) => showPage(page)) }
                        </Box>
                        <Box className='icon'>
                            <Tooltip title='Click to Open Menu'>
                                <IconButton onClick={() => setOpen(!open)}>
                                    <Avatar /*alt='put alt text' src='../../static/images/???'*//>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </span>
            </AppBar>
            { open && <UserMenu /> }
        </>
    )
}

export default NavBar