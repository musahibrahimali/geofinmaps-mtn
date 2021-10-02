import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useStateValue} from "../../../../provider/AppState";
import {NavbarStyles} from "./NavbarStyles";
import React, {useState} from "react";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {useRouter} from "next/router";

const menuId = 'primary-search-account-menu';
const Navbar = (props) => {
    const {handleOpenDrawer} = props;
    const styles = NavbarStyles();
    const [{isSideBarOpen}] = useStateValue();
    const router = useRouter();
    const [{user}] = useStateValue();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleSignInClick = () => {
        handleMenuClose();
        router.push('/admin/auth').then(results => console.log(results));
    }

    const handleAdminSignInClick = () => {
        handleMenuClose();
        router.push('/admin').then(results => console.log(results));
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

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
                {user ? <MenuItem onClick={handleMenuClose}>Profile</MenuItem> : <div> </div>}
                {user ? <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem> : <div> </div>}
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
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <AppBar
                position="fixed"
                className={clsx(styles.appBar, {
                    [styles.appBarShift]: isSideBarOpen,
                })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleOpenDrawer}
                        edge="start"
                        className={clsx(styles.menuButton, {
                            [styles.hide]: isSideBarOpen,
                        })}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        GeofinMaps
                    </Typography>

                    <div className={styles.grow} />

                    <div>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </div>

                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
        </>
    );
};

export default Navbar;