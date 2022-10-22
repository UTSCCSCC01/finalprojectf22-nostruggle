import { Card, MenuList, MenuItem, Typography } from "@mui/material"
import { Link } from "react-router-dom";

const ListMenu = (props) => {

    function getItemOfType(item) {
        switch(props.type) {
            case 'link':
                return <Link to={ props.path[ item ] }>{ item }</Link>
            default:
                return <Typography textAlign="center">{ item }</Typography>
        }
    }

    const showItems = (item) => {
        return <MenuItem key={ item }>{ getItemOfType(item) }</MenuItem>
    };

    return (
        <Card raised={true} className={ props.className }>
            <MenuList>{ props.items.map((item) => showItems(item)) }</MenuList>
        </Card>
    )
}

export default ListMenu