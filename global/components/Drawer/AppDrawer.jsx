import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import {DrawerStyles} from "./DrawerStyles";
import {useStateValue} from "../../../provider/AppState";
import {Paper} from "@material-ui/core";
import {MenuItems} from "./MenuItem/MenuItems";
import MenuItemCard from "./MenuItem/MenuItemCard";

const AppDrawer = (props) => {
    const {handleOpenDrawer} = props;
    const [{ isDrawerOpen }] = useStateValue();
    const styles = DrawerStyles();

    return (
        <Paper classes={{root: styles.root}}>
            <SwipeableDrawer
                anchor={"right"}
                open={isDrawerOpen}
                onClose={handleOpenDrawer}
                onOpen={handleOpenDrawer}>
                <Paper
                    classes={{root: styles.root}}
                    className={styles.list}
                    role="presentation"
                    onClick={handleOpenDrawer}
                    onKeyDown={handleOpenDrawer}>
                    <List>
                        {
                            MenuItems.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <MenuItemCard
                                            text={item.name}
                                            icon={item.icon}
                                        />
                                    </div>
                                );
                            })
                        }
                    </List>
                </Paper>
            </SwipeableDrawer>
        </Paper>
    );
}

export default AppDrawer;

