import React from 'react';
import Link from 'next/link';
import {Typography} from "@material-ui/core";

const CopyRight = () => {
    return (
        <>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                {/* change this link to redirect to required page (for now redirects to home page) */}
                <Link color="inherit" href="/">
                    GeofinMaps
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </>
    );
}

export default CopyRight;
