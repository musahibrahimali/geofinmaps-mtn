import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {useStateValue} from "../../../provider/AppState";
import {SideBarStyles} from "./SideBarStyles";
import {useTheme} from "@material-ui/core";

const SideBar = (props) => {
    const theme = useTheme();
    const styles = SideBarStyles();
    const {handleOpenSideBar} = props;
    const [{isSideBarOpen}] = useStateValue();

    return (
        <Drawer
            variant="permanent"
            className={clsx(styles.drawer, {
                [styles.drawerOpen]: isSideBarOpen,
                [styles.drawerClose]: !isSideBarOpen,
            })}
            classes={{
                paper: clsx({
                    [styles.drawerOpen]: isSideBarOpen,
                    [styles.drawerClose]: !isSideBarOpen,
                }),
            }}
        >
            <div className={styles.toolbar}>
                <IconButton onClick={handleOpenSideBar}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default SideBar;