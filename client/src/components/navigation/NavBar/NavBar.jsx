import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Box, Tooltip, Button, IconButton, Avatar, Divider } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { ChevronLeft, ChevronRight, Home, HomeRepairService, Notifications } from '@mui/icons-material';
import { ReactComponent as HomeIcon } from '../../../assets/icons/home.svg'
 
import ListMenu from "../../lists/ListMenu";

import './NavBar.css'

import { useNavBarSignedInPages, useNavBarSignedOutPages } from '../../../pages/constants';
import { useUserState } from '../../../features/SignUp/UserContext';
import ToolsBar from '../ToolsBar'
import NavBarButton from '../../buttons/NavBarButton';
import NotificationSideBar from '../../../features/Notifications/NotificationSideBar';
import { useEffect } from 'react';
import ApiCall from '../../api/ApiCall';

const NavBar = ({ load }) => {

    const { userState, setUserState } = useUserState();
    const navBarSignedInPages = useNavBarSignedInPages();
    const navBarSignedOutPages = useNavBarSignedOutPages();
    const navigate = useNavigate();
    const location = useLocation();
    const [ openDrawer, toggleOpenDrawer ] = useState(true);
    const [ openMenu, toggleOpenMenu ] = useState(false);
    const [ offset, setOffset ] = useState(58);
    const [ openNotifications, setOpenNotifications ] = useState(false)
    
    const showPage = (page) => {
        const buttonProps = {
            disabled: page.path === location.pathname ,
            onClick: () => navigate(page.path),
            className: 'NavBarButton'
        }
        return (
            <Tooltip title={ 'Open ' + page.title } key={ page.title } placement='left'>
                <span>
                    {
                        page.path !== '/' ?
                        <NavBarButton
                            {...buttonProps}
                        >{ page.title }
                        </NavBarButton>
                        : 
                        <Button {...buttonProps} startIcon={<HomeIcon width='180px' height='80px'/>}/>
                    }
                </span>
            </Tooltip>
        )
    };

    useEffect(() => {
        const sidebar = document.getElementById('sidebar');
        setOffset(sidebar === null ? 58 : sidebar.offsetWidth );
        const drawerToggle = document.getElementById('drawer-toggle');
        if ((sidebar === null && drawerToggle === null) || !userState.signedIn) {
            setOffset(0);
        } else {
            setOffset(sidebar === null ? drawerToggle.offsetWidth : Math.max(drawerToggle.offsetWidth, drawerToggle === null ? sidebar.offsetWidth : 0));
        }
    }, [openDrawer, userState.signedIn]);

    
    const onViewAllNotifications = () => {
        setOpenNotifications(false)
        navigate('/inbox')
    }

    return (
        <>
            <Drawer 
            variant='persistent' 
            anchor='left' 
            open={ userState.signedIn } >
                <div id='sidebar'>
                    <div id='drawer-toggle'>
                        <IconButton onClick={ () => {
                            toggleOpenDrawer(!openDrawer);
                            setUserState({ ...userState, shift: !openDrawer });
                        }}>
                            {
                                openDrawer ? 
                                <ChevronLeft sx={{ fontSize: '40px', zIndex:1000 }} />
                                : <ChevronRight sx={{ fontSize: '40px', zIndex:1000}} />
                            }
                        </IconButton>
                    </div>
                    {
                        openDrawer &&
                        <>
                            <Box sx={{ display: 'inline-flex', flexDirection: 'column', height: 'max-content', top: '-10px'}}>
                            {  navBarSignedInPages.map((page) => showPage(page)) }
                            <Divider sx={{ margin: '4px'}}/>
                            </Box>
                        </>
                    }
                    <ToolsBar offset={offset} variant={ openDrawer ? 'text' : 'no-text' }/>
                </div>
            </Drawer>
            
        

            
            <Box
                sx={{ 
                left: offset, 
                width: 'calc(100% - ' + offset + 'px)',
                }}
                position='relative'>

                <Toolbar className='top-bar' sx={{ backgroundColor: '#82A8B5', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                {
                    userState.signedIn &&
                    <>
                        <Tooltip title='Notifications'>
                            <IconButton onClick={ () => setOpenNotifications(!openNotifications)} sx={{ margin: '4px'}}>
                                <Notifications sx={{color: userState.hasNewNotifications ? 'yellow' : '', fontSize: 35 }}/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title='Click to Open Menu'>
                            <IconButton onClick={ () => toggleOpenMenu(!openMenu) } sx={{ margin: '4px'}}>
                                <Avatar sx={{ width: '50px', height: '50px'}} /*alt='put alt text' src='../../assets/images/???'*//>
                            </IconButton>
                        </Tooltip>
                    </>
                    }
                </Toolbar>


            </Box>
          
            <div style={{ paddingLeft: offset  + 100}} id='main' >
                { load && <Outlet/>}
            </div>
            { userState.signedIn &&
                <Drawer sx={{ width: openNotifications ? 200 : 0 }} className='NotificationsDrawer' variant='persistent' anchor='right' open={ openNotifications } >
                    <NotificationSideBar onViewAll={onViewAllNotifications}/>
                </Drawer>
            }

            { openMenu && userState.signedIn && <ListMenu className='UserMenu' type='link' items={[ 'Profile', 'Feed', 'Sign Out' ]} path={{ 'Profile': `/profile/${userState.user.username}`, 'Feed': '/inbox', 'Sign Out': '/logout' }}/> }
        </>
    )
}

export default NavBar