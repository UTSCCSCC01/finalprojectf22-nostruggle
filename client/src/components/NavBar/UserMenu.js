import { Card, MenuList, MenuItem, Typography } from "@mui/material"

const UserMenu = () => {

    const menuItems = [ 'Profile', 'Sign Out' ];

    const showItems = (item) => {
        return (
            <MenuItem key={ item }>
                <Typography textAlign="center">{ item }</Typography>
            </MenuItem>
        )
    };

    return (
        <Card raised='true' className='UserMenu'>
            <MenuList>{ menuItems.map((item) => showItems(item)) }</MenuList>
        </Card>
    )
}

export default UserMenu