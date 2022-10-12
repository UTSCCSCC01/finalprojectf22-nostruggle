import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, List } from '@mui/material';

const ListPlain = (props) => {
        
    const showItems = (item) => {
        return (
            <span key={ item }>
                <ListItem key={ item }>
                    <ListItemButton>
                        <ListItemText primary={ item } />
                    </ListItemButton>
                </ListItem>
                <Divider />
            </span>
        )
    };

    return (
        <List>{ props.items.map((item) => showItems(item)) }</List>
    )
}

export default ListPlain