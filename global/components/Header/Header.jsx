import React from 'react';
import Navbar from "./Navbar/Navbar";

const Header = (props) => {
    const {handleOpenDrawer} = props;

    return (
        <div>
            <Navbar />
        </div>
    );
};

export default Header;