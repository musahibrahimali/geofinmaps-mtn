import React from 'react';
import Navbar from "./Navbar/Navbar";

const Header = (props) => {
    const {handleOpenSideBar} = props;
    return (
        <>
            <Navbar handleOpenSideBar={handleOpenSideBar} />
        </>
    );
};

export default Header;