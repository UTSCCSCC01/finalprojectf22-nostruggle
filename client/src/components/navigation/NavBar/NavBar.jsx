import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Box, Tooltip, Button, IconButton, Avatar } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';

import { ChevronLeft, ChevronRight, Home, HomeRepairService } from '@mui/icons-material';
 
import ListMenu from "../../lists/ListMenu";
import ListPlain from '../../lists/ListPlain';

import './NavBar.css'

import { useNavBarSignedInPages, useNavBarSignedOutPages } from '../../../pages/constants';
import { useUserState } from '../../../features/SignUp/UserContext';
import ToolsBar from '../../../features/ToolsBar';
import { useEffect } from 'react';
const NavBar = () => {

    const { userState } = useUserState();
    const navBarSignedInPages = useNavBarSignedInPages();
    const navBarSignedOutPages = useNavBarSignedOutPages();
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
                        page.path !== '/' ?
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
    
    return (
        <>
            { openDrawer && userState.signedIn &&
            <Drawer className='ToolbarDrawer' variant='persistent' anchor='left' open={ openDrawer } sx={{ width: 70, flexShrink: 0 }}>
                <div className='SideBar'><ToolsBar/></div>
            </Drawer>
            }

            <AppBar sx={{ zIndex: 2000}} position='fixed'>
                <span>
                    <Toolbar className='Toolbar'>
                        {
                            userState.signedIn &&
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={ () => setOpenDrawer(!openDrawer) }>
                                    <HomeRepairService sx={{ fontSize: '40px', color: openDrawer === true ?  '#EFF3F6' : '' }} />
                                </IconButton>
                            </Box>
                        }
                        <Box sx={{ flexGrow: 1, paddingLeft: '20px', display: 'flex' }}>
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

            { openMenu && <ListMenu className='UserMenu' type='link' items={[ 'Profile', 'Sign Out' ]} path={{ 'Profile': `/profile/${userState.user.username}`, 'Sign Out': '/logout' }}/> }
        </>
    )
}

export default NavBar