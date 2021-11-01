import React from 'react';
import {DrawerStyles} from "./DrawerStyles";
import {useStateValue} from "../../../provider/AppState";
import MenuItemCard from "./MenuItem/MenuItemCard";
import PersonIcon from '@material-ui/icons/Person';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {SwipeableDrawer, Paper, List} from "@material-ui/core";
import firebase from "firebase";
import {useRouter} from "next/router";


const AppDrawer = (props) => {
    const {handleOpenDrawer} = props;
    const [{ isDrawerOpen }] = useStateValue();
    const styles = DrawerStyles();
    const router = useRouter();

    return (
        <Paper classes={{root: styles.root}}>
            <SwipeableDrawer
                anchor={"left"}
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
                            onClick={() => {
                                firebase.auth().signOut().then(() => {
                                    router.replace('/admin/auth').then(() => {});
                                });
                            }}
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

