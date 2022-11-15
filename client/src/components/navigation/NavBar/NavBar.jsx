import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Box, Tooltip, Button, IconButton, Avatar } from '@mui/material';
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
        const element = document.getElementById('SideBar'); 
        setOffset(element === null ? '0px' : element.offsetWidth + 'px');
    }, [openDrawer])

    return (
        <>
            { openDrawer && userState.signedIn &&
            <Drawer className='ToolbarDrawer' variant='persistent' anchor='left' open={ openDrawer } sx={{ width: 70, flexShrink: 0 }} >
                <div id='SideBar'><ToolsBar/></div>
            </Drawer>
            }

            <AppBar sx={{ zIndex: 2000, left: offset, width: 'calc(100% - ' + offset + ')' }} position='fixed'>
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