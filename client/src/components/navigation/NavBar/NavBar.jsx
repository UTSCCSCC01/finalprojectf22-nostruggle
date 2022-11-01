import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Box, Tooltip, Button, IconButton, Avatar } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';

import { ChevronLeft, ChevronRight, Home } from '@mui/icons-material';
 
import ListMenu from "../../lists/ListMenu";
import ListPlain from '../../lists/ListPlain';

import './NavBar.css'

import { navBarSignedInPages, navBarSignedOutPages } from '../../../pages/constants';
import { useUserState } from '../../../features/SignUp/UserContext';
import ToolBar from '../../../features/ToolBar';
import { useEffect } from 'react';
const NavBar = () => {

    const { userState } = useUserState();
    const navigate = useNavigate();
    const location = useLocation();
    const [ openDrawer, setOpenDrawer ] = useState(false);
    const [ openMenu, setOpenMenu ] = useState(false);
    
    const showPage = (page) => {
        const buttonProps = {
            disabled: page.path === location.pathname ,
            sx : { color: 'white', fontSize: '1.2rem' },
            onClick: () => navigate(page.path),
            className: 'NavBarButton'
        }
        return (
            <Tooltip title={ 'Open ' + page.title } key={ page.title }>
                <span>
                    {
                        page.path !== '/home' ?
                        <Button
                            {...buttonProps}
                        >{ page.title }
                        </Button>
                        : 
                        <IconButton {...buttonProps} children={<Home sx={{fontSize: "2rem"}}/>}/>

                    }
                </span>
            </Tooltip>
        )
    };
    
    useEffect(() => {
        if (!userState.signedIn && (!navBarSignedOutPages.map((page) => page.path).includes(location.pathname))){
            navigate('/login')
        }
    }, [location.pathname])
    return (
        <>
            { openDrawer && userState.signedIn &&
            <Drawer variant='persistent' anchor='left' open={ openDrawer } sx={{ width: 240, flexShrink: 0 }}>
                <div className='DrawerHeader'>
                    <IconButton onClick={() => setOpenDrawer(false) }>
                        { openDrawer === true ? <ChevronLeft /> : <ChevronRight /> }
                    </IconButton>
                </div>
                <div className='SideBar'><ToolBar/></div>
            </Drawer>
            }

            <AppBar sx={{ zIndex: 2000}} position='fixed'>
                <span className={ openDrawer ? 'shift' : null }>
                    <Toolbar>
                        <Box>
                            <IconButton onClick={ () => setOpenDrawer(!openDrawer) }>
                                { openDrawer === true ? null : <ChevronRight /> }
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        { userState.signedIn ? navBarSignedInPages.map((page) => showPage(page)) : navBarSignedOutPages.map((page) => showPage(page)) }
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