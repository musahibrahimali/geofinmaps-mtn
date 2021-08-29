import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useStateValue} from "../../../../provider/AppState";
import {NavbarStyles} from "./NavbarStyles";
import React from "react";

const Navbar = (props) => {
    const {handleOpenSideBar} = props;
    const styles = NavbarStyles();
    const [{isSideBarOpen}] = useStateValue();

    return (
        <>
            <AppBar
                position="fixed"
                className={clsx(styles.appBar, {
                    [styles.appBarShift]: isSideBarOpen,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleOpenSideBar}
                        edge="start"
                        className={clsx(styles.menuButton, {
                            [styles.hide]: isSideBarOpen,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        GeofinMaps
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;