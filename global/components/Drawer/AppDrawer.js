import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import {DrawerStyles} from "./DrawerStyles";
import {useStateValue} from "../../../provider/AppState";
import {Paper} from "@material-ui/core";
import MenuItemCard from "./MenuItem/MenuItemCard";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
                        <MenuItemCard
                            text="Profile"
                            icon={<PersonIcon color="primary"  />}
                        />
                        <MenuItemCard
                            text="Admin"
                            icon={<PersonIcon color="primary"  />}
                        />
                        <MenuItemCard
                            text="Operator"
                            icon={<PersonIcon color="primary"  />}
                        />
                        <MenuItemCard
                            text="Reports"
                            icon={<PersonIcon color="primary"  />}
                        />
                        <MenuItemCard
                            text="operators"
                            icon={<PersonIcon color="primary"  />}
                        />
                        <MenuItemCard
                            text="Sign In"
                            icon={<LockOpenIcon color="primary" />}
                        />
                        <MenuItemCard
                            text="Sign Out"
                            icon={<ExitToAppIcon color="primary" />}
                        />
                    </List>
                </Paper>
            </SwipeableDrawer>
        </Paper>
    );
}

export default AppDrawer;

