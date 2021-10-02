import React from 'react';
import {Divider, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

const MenuItemCard = (props) => {
    const {text, icon} = props;
    return (
        <>
            <ListItem button>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            <Divider />
        </>
    );
};

export default MenuItemCard;