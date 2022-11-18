import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Box, Tooltip, Button, IconButton, Avatar, Collapse } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { ChevronLeft, ChevronRight, Home, HomeRepairService } from '@mui/icons-material';
 
import ListMenu from '../../lists/ListMenu';

import './NavBar.css'

import { useNavBarSignedInPages, useNavBarSignedOutPages } from '../../../pages/constants';
import { useUserState } from '../../../features/SignUp/UserContext';
import ToolsBar from '../ToolsBar'
import { useEffect } from 'react';
import NavBarButton from '../../buttons/NavBarButton';

const NavBar = () => {

    const { userState, setUserState } = useUserState();
    const navBarSignedInPages = useNavBarSignedInPages();
    const navBarSignedOutPages = useNavBarSignedOutPages();
    const navigate = useNavigate();
    const location = useLocation();
    const [ openDrawer, toggleOpenDrawer ] = useState(false);
    const [ openMenu, toggleOpenMenu ] = useState(false);
    const [ offset, setOffset ] = useState(0);
    
    const showPage = (page) => {
        const buttonProps = {
            disabled: page.path === location.pathname ,
            onClick: () => navigate(page.path),
            className: 'NavBarButton'
        }
        return (
            <Tooltip title={ 'Open ' + page.title } key={ page.title }>
                <span>
                    {
                        page.path !== '/' ?
                        <NavBarButton
                            {...buttonProps}
                        >{ page.title }
                        </NavBarButton>
                        : 
                        <IconButton {...buttonProps} children={<Home sx={{fontSize: '2rem'}}/>}/>

                    }
                </span>
            </Tooltip>
        )
    };

    useEffect(() => {
        const sidebar = document.getElementById('sidebar'); 
        const drawerToggle = document.getElementById('drawer-toggle');
        if (sidebar === null && drawerToggle === null) {
            setOffset(0);
        }
        setOffset(sidebar === null ? drawerToggle.offsetWidth : Math.max(drawerToggle.offsetWidth, drawerToggle === null ? sidebar.offsetWidth : 0));
    }, [openDrawer])

    
    return (
        <>
            <Drawer 
            variant='persistent' 
            anchor='left' 
            open={ true } >
                <div id='drawer-toggle'>
                    <IconButton onClick={ () => {
                        toggleOpenDrawer(!openDrawer);
                        setUserState({ ...userState, shift: !openDrawer });
                    }}>
                        {
                            openDrawer ? 
                            <ChevronLeft sx={{ fontSize: '40px' }} />
                            : <ChevronRight sx={{ fontSize: '40px' }} />
                        }
                    </IconButton>
                </div>
                <div id='sidebar'>
                    <ToolsBar variant={ openDrawer ? 'text' : 'no-text' }/>
                </div>
            </Drawer>


            <AppBar
            sx={{ 
                zIndex: 2000,
                left: offset, 
                width: `calc(100% - ${offset})`,
                transition: theme => theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                ...( openDrawer && {
                    transition: theme => theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                })
            }}
            position='fixed'>
                <span>
                    <Toolbar className='NavBar'>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        { userState.signedIn ? navBarSignedInPages.map((page) => showPage(page)) : navBarSignedOutPages.map((page) => showPage(page)) }
                        </Box>

                        <Box className='icon'>
                            <Tooltip title='Click to Open Menu'>
                                <IconButton onClick={ () => toggleOpenMenu(!openMenu) }>
                                    <Avatar /*alt='put alt text' src='../../assets/images/???'*//>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </span>
            </AppBar>

            { openMenu && <ListMenu className='UserMenu' type='link' items={[ 'Profile', 'My Posts', 'Sign Out' ]} path={{ 'Profile': '/profile', 'My Posts': `posts/${userState.user.username}`, 'Sign Out': '/logout' }}/> }
        </>
    )
}

export default NavBar