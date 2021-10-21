import React from 'react';
import clsx from 'clsx';
import {
    Drawer,
    List,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import {useStateValue} from "../../../provider/AppState";
import {SideBarStyles} from "./SideBarStyles";
import {useTheme} from "@mui/styles";

const SideBar = (props) => {
    const theme = useTheme();
    const styles = SideBarStyles();
    const {handleOpenDrawer} = props;
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
                <IconButton onClick={handleOpenDrawer}>
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