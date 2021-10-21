import React, {useState} from 'react';
import Link from 'next/link';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    MenuItem,
    Menu,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ClientNavbarStyles} from "./ClientNavbarStyles";
import {useStateValue} from "../../../../provider/AppState";
import {useRouter} from "next/router";
import firebase from 'firebase';
import {Notification} from "../../../global";

const ClientNavbar = (props) => {
    const {handleOpenDrawer} = props;
    const router = useRouter();
    const [{user}] = useStateValue();
    const styles = ClientNavbarStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [signIn, setSignIn] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message:"", type:""});

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // notify user of successful log in or log out
    const notifyUser = () => {
        if(signIn){
            setNotify({
                isOpen: true,
                message: "Sign in Successful",
                type: "success"
            });
        }else{
            setNotify({
                isOpen: true,
                message: "Sign Out Successful",
                type: "success"
            });
        }

    }

    const handleSignInClick = () => {
        handleMenuClose();
        router.push('/auth').then(() => console.log("log in page"));
    }

    const handleAdminSignInClick = () => {
        handleMenuClose();
        router.push('/admin').then(() => console.log("admin page"));
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    /* functions */
    const handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            setSignIn(false);
            notifyUser();
        });
        handleMenuClose();
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {user ? <MenuItem onClick={handleMenuClose}>Profile</MenuItem> : <div> </div>}
            {user ? <MenuItem onClick={handleSignOut}>Sign Out</MenuItem> : <div> </div>}
            {user ? <div> </div> : <MenuItem onClick={handleSignInClick}>Sign In</MenuItem>}
            {user ? <div> </div> : <MenuItem onClick={handleAdminSignInClick}>Admin</MenuItem>}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <div className={styles.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={styles.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleOpenDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography className={styles.title} variant="h6" noWrap>
                            <Link href="/">
                                <a>GeofinMaps</a>
                            </Link>
                        </Typography>
                        <div className={styles.grow} />
                        <div className={styles.sectionDesktop}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit">
                                <AccountCircleIcon />
                            </IconButton>
                        </div>
                        <div className={styles.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}

            </div>

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    );
};

export default ClientNavbar;