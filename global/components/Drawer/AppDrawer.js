import React from 'react';
import {DrawerStyles} from "./DrawerStyles";
import {useStateValue} from "../../../provider/AppState";
import MenuItemCard from "./MenuItem/MenuItemCard";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {SwipeableDrawer, Paper, List} from "@mui/material";

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
                            url={"/admin"}
                            icon={<PersonIcon color="primary"  />}
                        />
                        <MenuItemCard
                            text="Admin"
                            url={"/admin"}
                            icon={<PersonIcon color="primary"  />}
                        />
                        <MenuItemCard
                            text="Operators"
                            url={"/admin/operators"}
                            icon={<PersonIcon color="primary"  />}
                        />
                        <MenuItemCard
                            text="Reports"
                            url={"/admin/reports"}
                            icon={<PersonIcon color="primary"  />}
                        />
                        <MenuItemCard
                            text="Add Cable Data"
                            url={"/admin/addcable"}
                            icon={<PersonIcon color="primary"  />}
                        />
                        <MenuItemCard
                            text="Sign In"
                            url={"/admin/signin"}
                            icon={<LockOpenIcon color="primary" />}
                        />
                        <MenuItemCard
                            text="Sign Out"
                            url={"/admin"}
                            icon={<ExitToAppIcon color="primary" />}
                        />
                    </List>
                </Paper>
            </SwipeableDrawer>
        </Paper>
    );
}

export default AppDrawer;

