import React from 'react';
import Link from 'next/link';
import {Typography} from "@mui/material";

const CopyRight = () => {
    return (
        <>
            <Typography variant="body2" className="text-gray-700 dark:text-gray-100" align="center">
                {'Copyright © '}
                {/* change this link to redirect to required page (for now redirects to home page) */}
                <Link  href="/">
                    GeofinMaps
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </>
    );
}

export default CopyRight;
