import { useState } from 'react';
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, List } from '@mui/material';

const SideBar = () => {
    
    const listItems = [ 'Search?', 'No Struggle Browsing' ];
    
    const showItems = (item) => {
        return (
            <>
                <ListItem key={ item }>
                    <ListItemButton>
                        <ListItemText primary={ item } />
                    </ListItemButton>
                </ListItem>
                <Divider />
            </>
        )
    };

    return (
        <List>{ listItems.map((item) => showItems(item)) }</List>
    )
}

export default SideBar