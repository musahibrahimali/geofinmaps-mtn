import React from 'react';
import {useStateValue} from "../../provider/AppState";
import actionTypes from '../../Utils/Utils';
import {Header,AppDrawer,Footer} from "../components/globalComponents";

const Layout = (props) => {

    /* props */
    const {children} = props;
    /* data layer */
    const [{ theme, isDrawerOpen, isAdmin, user }, dispatch] = useStateValue();

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

    return (
        <>
            <div className={theme ? "dark" : ""}>
                {/* main header of the web app */}
                <div id="back-to-top-anchor" className="sticky top-0 shadow-md transition-all ease-out duration-300 z-50">
                    <Header handleOpenDrawer={handleOpenDrawer}/>
                </div>

                {/* body content of the app */}
                <div className="h-full bg-white dark:bg-gray-800 z-30">
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
                <div className="z-40">
                    <Footer handleTheme={handleTheme} />
                </div>
            </div>
        </>
    );
};

export default Layout;