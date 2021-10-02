import React from 'react';
import Navbar from "./Navbar/Navbar";

const Header = (props) => {
    const {handleOpenDrawer} = props;
    return (
        <>
            <Navbar handleOpenDrawer={handleOpenDrawer} />
        </>
    );
};

export default Header;