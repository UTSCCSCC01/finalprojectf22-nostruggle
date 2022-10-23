import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Box, Tooltip, Button, IconButton, Avatar } from "@mui/material";

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
 
import ListMenu from "../../lists/ListMenu";
import ListPlain from '../../lists/ListPlain';

import './NavBar.css'

const NavBar = (props) => {

    const pages = ['Forum', 'Discover'];
    const [ openDrawer, setOpenDrawer ] = useState(false);
    const [ openMenu, setOpenMenu ] = useState(false);
    
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
            { openDrawer && 
            <Drawer variant='persistent' anchor='left' open={ openDrawer } sx={{ width: 240, flexShrink: 0 }}>
                <div className='DrawerHeader'>
                    <IconButton onClick={() => setOpenDrawer(false) }>
                        { openDrawer === true ? <ChevronLeft /> : <ChevronRight /> }
                    </IconButton>
                </div>
                <div className='SideBar'><ListPlain items={[ 'Search?', 'No Struggle Browsing' ]} /></div>
            </Drawer>
            }

            <AppBar position='static'>
                <span className={ openDrawer ? 'shift' : null }>
                    <Toolbar>
                        <Box>
                            <IconButton onClick={ () => setOpenDrawer(!openDrawer) }>
                                { openDrawer === true ? null : <ChevronRight /> }
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        { pages.map((page) => showPage(page)) }
                        </Box>

                        <Box className='icon'>
                            <Tooltip title='Click to Open Menu'>
                                <IconButton onClick={ () => setOpenMenu(!openMenu) }>
                                    <Avatar /*alt='put alt text' src='../../assets/images/???'*//>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </span>
            </AppBar>

            { openMenu && <ListMenu className='UserMenu' type='link' items={[ 'Profile', 'Sign Out' ]} path={{ 'Profile': '/profile', 'Sign Out': '/logout' }}/> }
        </>
    )
}

export default NavBar