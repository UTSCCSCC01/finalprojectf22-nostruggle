import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Box, Tooltip, Button, IconButton, Avatar, Collapse } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { ChevronLeft, ChevronRight, Home, HomeRepairService } from '@mui/icons-material';
 
import ListMenu from '../../lists/ListMenu';

import './NavBar.css'

import { navBarSignedInPages, navBarSignedOutPages } from '../../../pages/constants';
import { useUserState } from '../../../features/SignUp/UserContext';
import ToolsBar from '../ToolsBar'
import { useEffect } from 'react';

const NavBar = () => {

    const { userState } = useUserState();
    const navigate = useNavigate();
    const location = useLocation();
    const [ openDrawer, toggleOpenDrawer ] = useState(false);
    const [ openMenu, toggleOpenMenu ] = useState(false);
    const [ offset, setOffset ] = useState(0);
    
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
                        page.path !== '/' ?
                        <Button
                            {...buttonProps}
                        >{ page.title }
                        </Button>
                        : 
                        <IconButton {...buttonProps} children={<Home sx={{fontSize: '2rem'}}/>}/>

                    }
                </span>
            </Tooltip>
        )
    };

    useEffect(() => {
        const drawer = document.getElementById('SideBar'); 
        const miniDrawer = document.getElementById('MiniBar');
        setOffset(drawer === null ? (miniDrawer === null ? '0px' : miniDrawer.offsetWidth) : drawer.offsetWidth + 'px');
    }, [openDrawer])

    
    return (
        <>
            { userState.signedIn &&
            <Drawer 
            className='ToolbarDrawer' 
            variant='persistent' 
            anchor='left' 
            open={ true } >
                <div id='SideBar'>
                    <ToolsBar variant={ openDrawer ? 'text' : 'no-text' }/>
                </div>
            </Drawer>
            }


            <AppBar sx={{ 
                zIndex: 2000,
                right: -offset, 
                width: 'calc(100% - ' + offset + ')',
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
                    <Toolbar className='Toolbar'>
                        {
                            userState.signedIn &&
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={ () => toggleOpenDrawer(!openDrawer) }>
                                    <HomeRepairService sx={{ fontSize: '40px', color: openDrawer === true ?  '#EFF3F6' : '' }} />
                                </IconButton>
                            </Box>
                        }
                        <Box sx={{ flexGrow: 1, paddingLeft: '20px', display: 'flex' }}>
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

            { openMenu && <ListMenu className='UserMenu' type='link' items={[ 'Profile', 'Sign Out' ]} path={{ 'Profile': '/profile', 'Sign Out': '/logout' }}/> }
        </>
    )
}

export default NavBar