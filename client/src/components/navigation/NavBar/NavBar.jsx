import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Box, Tooltip, Button, IconButton, Avatar, Divider } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { ChevronLeft, ChevronRight, HomeRepairService, StickyNote2 } from '@mui/icons-material';
import { ReactComponent as HomeIcon } from '../../../assets/icons/home.svg'
import ListMenu from '../../lists/ListMenu';

import './NavBar.css'

import { useNavBarSignedInPages, useNavBarSignedOutPages } from '../../../pages/constants';
import { useUserState } from '../../../features/SignUp/UserContext';
import ToolsBar from '../ToolsBar'
import { useEffect } from 'react';
import NavBarButton from '../../buttons/NavBarButton';

const NavBar = ({ load }) => {

    const { userState, setUserState } = useUserState();
    const navBarSignedInPages = useNavBarSignedInPages();
    const navBarSignedOutPages = useNavBarSignedOutPages();
    const navigate = useNavigate();
    const location = useLocation();
    const [ openDrawer, toggleOpenDrawer ] = useState(true);
    const [ openMenu, toggleOpenMenu ] = useState(false);
    const [ offset, setOffset ] = useState(58);
    
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
                        <Button
                            {...buttonProps}
                        >{ page.title }
                        </Button>
                        : 
                        <Button {...buttonProps} startIcon={<HomeIcon width='200px' height='80px'/>}/>
                    }
                </span>
            </Tooltip>
        )
    };

    useEffect(() => {
        const sidebar = document.getElementById('sidebar');
        setOffset(sidebar === null ? 58 : sidebar.offsetWidth );
        const drawerToggle = document.getElementById('drawer-toggle');
        if (sidebar === null && drawerToggle === null) {
            setOffset(0);
        } else {
            setOffset(sidebar === null ? drawerToggle.offsetWidth : Math.max(drawerToggle.offsetWidth, drawerToggle === null ? sidebar.offsetWidth : 0));
        }
    }, [openDrawer]);

    
    return (
        <>
            <Drawer 
            variant='persistent' 
            anchor='left' 
            open={ true } >
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
                            <Box sx={{ display: 'inline-flex', flexDirection: 'column', height: 'max-content', top: '-10px', margin: '0px 10px'}}>
                            { navBarSignedInPages.map((page) => showPage(page)) }
                            <Divider sx={{ padding: '4px'}}/>
                            <p> NoStruggle Toolkit</p>
                            </Box>
                        </>
                    }
                    <ToolsBar variant={ openDrawer ? 'text' : 'no-text' }/>
                </div>
            </Drawer>



            <Box
            sx={{ 
                left: offset, 
                width: 'calc(100% - ' + offset + 'px)',
                }}
                position='relative'>
                <Tooltip title='Click to Open Menu'>
                    <IconButton onClick={ () => toggleOpenMenu(!openMenu) } sx={{ position: 'absolute', top: '20px', right: '20px'}}>
                        <Avatar sx={{ width: '50px', height: '50px'}} /*alt='put alt text' src='../../assets/images/???'*//>
                    </IconButton>
                </Tooltip>

                <div id='main' >
                    { load && <Outlet/>}
                </div>
            </Box>

            { openMenu && <ListMenu className='UserMenu' type='link' items={[ 'Profile', 'My Posts', 'Sign Out' ]} path={{ 'Profile': '/profile', 'My Posts': `posts/${userState.user.username}`, 'Sign Out': '/logout' }}/> }
        </>
    )
}

export default NavBar