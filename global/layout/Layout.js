import React, {useEffect} from 'react';
import {useStateValue} from "../../provider/AppState";
import {LayoutStyles} from "./LayoutStyles";
import actionTypes from '../../Utils/Utils';
import {AppDrawer, Footer, SideBar} from "../global";
import firebase from 'firebase';
import { ThemeProvider } from '@mui/material/styles';
import {createTheme} from "@mui/material";

const Layout = (props) => {
    /* props */
    const {children} = props;
    const styles = LayoutStyles();
    /* data layer */
    const [{ theme, isDrawerOpen, isAdmin }, dispatch] = useStateValue();

    const appTheme = createTheme({
        palette: {
            mode: theme ? "dark" : "light", // toggle light and dark theme
            ...(!theme
                ? {
                    // palette values for light mode

                }
                : {
                    // palette values for dark mode
                    custom_paper: {
                        main: '#121212',
                    }
                }),
        },
    });

    /* switch between dark and light mode */
    const handleTheme = () => {
        if(theme){
            dispatch({
                type: actionTypes.SET_THEME,
                theme: false,
            });
        }else{
            dispatch({
                type: actionTypes.SET_THEME,
                theme: true,
            });
        }
    }

    const handleOpenDrawer = () => {
        if(isDrawerOpen){
            dispatch({
                type: actionTypes.OPEN_DRAWER,
                isDrawerOpen: false,
            });
        }else{
            dispatch({
                type: actionTypes.OPEN_DRAWER,
                isDrawerOpen: true,
            });
        }
    }

    // on component mount (when it is rendered in the browser)
    useEffect(() => {
        // listen for auth changes then set the user accordingly
        firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                // user found
                dispatch({
                    type: actionTypes.SET_USER,
                    user: authUser,
                });
            } else {
                // no user
                dispatch({
                    type: actionTypes.SET_USER,
                    user: null,
                });
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeProvider theme={appTheme}>
            <div className={theme ? "dark" : ""}>
                {
                    isAdmin ?
                        /* user is an admin */
                        <div>
                            <div className={styles.root}>
                                <SideBar handleOpenDrawer={handleOpenDrawer} />
                            </div>

                            <div className="bg-white dark:bg-gray-900">
                                <div>
                                    <AppDrawer handleOpenDrawer={handleOpenDrawer} />
                                </div>
                                <div>
                                    {children}
                                </div>

                                {/*/!* footer for all pages *!/*/}
                                <Footer />
                            </div>
                        </div> :

                        /* user is not an admin */
                        <div>
                            {/* body content of the app */}
                            <div className="bg-white dark:bg-gray-900 h-full z-30">
                                {/* side bar and its content goes in here */}
                                <div>
                                    <AppDrawer handleOpenDrawer={handleOpenDrawer} />
                                </div>

                                {/* all pages content goes in here as children from props */}
                                <div>
                                    {children}
                                </div>
                                {/*<BackToTop />*/}
                            </div>

                            {/* footer for all pages */}
                            <div className="">
                                <Footer handleTheme={handleTheme} />
                            </div>
                        </div>
                }
            </div>
        </ThemeProvider>
    );
};

export default Layout;