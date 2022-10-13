import { Card, MenuList, MenuItem, Typography } from "@mui/material"

const ListMenu = (props) => {

    const showItems = (item) => {
        return (
            <MenuItem key={ item }>
                <Typography textAlign="center">{ item }</Typography>
            </MenuItem>
        )
    };

    return (
        <Card raised={true} className={ props.className }>
            <MenuList>{ props.items.map((item) => showItems(item)) }</MenuList>
        </Card>
    )
}

export default ListMenu