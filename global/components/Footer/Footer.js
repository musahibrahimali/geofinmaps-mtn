import React from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {CopyRight, ToggleButton} from "../../global";
import {FooterStyles} from "./FooterStyles";
import {Grid, Paper} from "@material-ui/core";
import { useStateValue } from '../../../provider/AppState';

const Footer = () => {
    const styles = FooterStyles();
    const [{isAdmin}] = useStateValue();

    return (
        <>
            <footer className={styles.main__footer}>
                <div className={styles.footer__content}>
                    <Grid container spacing={3}>
                        {/* first column */}
                        <Grid item xs={6} sm={3}>
                            <Paper classes={{root: styles.paper_shadow}} className={styles.paper}>
                                <Typography className={styles.tabTitle} variant="h6">
                                    GeoFinMaps
                                </Typography>
                                <Container className="mt-4">
                                    <ul className="flex flex-col justify-between items-center">
                                        <li className={styles.tabItem}>
                                            <Link href="/">
                                                <a>material content</a>
                                            </Link>
                                        </li>

                                        <li className={styles.tabItem}>
                                            <Link href="/">
                                                <a>latest updates</a>
                                            </Link>
                                        </li>

                                        <li className={styles.tabItem}>
                                            <Link href="/">
                                                <a>new features</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </Container>
                            </Paper>
                        </Grid>

                        {/* second column */}
                        <Grid item xs={6} sm={3}>
                            <Paper className={styles.paper}>
                                <Typography className={styles.tabTitle} variant="h6">
                                    Admin
                                </Typography>
                                <Container className="mt-4">
                                    <ul className="flex flex-col justify-between items-center">
                                        <li className={styles.tabItem}>
                                            <Link href="/">
                                                <a>material content</a>
                                            </Link>
                                        </li>

                                        <li className={styles.tabItem}>
                                            <Link href="/">
                                                <a>latest updates</a>
                                            </Link>
                                        </li>

                                        <li className={styles.tabItem}>
                                            <Link href="/">
                                                <a>new features</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </Container>
                            </Paper>
                        </Grid>

                        {/* third column */}
                        <Grid item xs={6} sm={3}>
                            <Paper className={styles.paper}>
                                <Typography className={styles.tabTitle} variant="h6">
                                    Blog
                                </Typography>
                                <Container className="mt-4">
                                    <ul className="flex flex-col justify-between items-center">
                                        <li className={styles.tabItem}>
                                            <Link href="/">
                                                <a>material content</a>
                                            </Link>
                                        </li>

                                        <li className={styles.tabItem}>
                                            <Link href="/">
                                                <a>latest updates</a>
                                            </Link>
                                        </li>

                                        <li className={styles.tabItem}>
                                            <Link href="/">
                                                <a>new features</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </Container>
                            </Paper>
                        </Grid>

                        {/* last column */}
                        <Grid item xs={6} sm={3}>
                            <Paper className={styles.paper}>
                                <Typography className={styles.tabTitle} variant="h6">
                                    Contact
                                </Typography>
                                <Container className="mt-4">
                                    <ul className="flex flex-col justify-between items-center">
                                        <li className={styles.tabItem}>
                                            <Link href="/">
                                                <a>+233 540 000 000</a>
                                            </Link>
                                        </li>

                                        <li className={styles.tabItem}>
                                            <Link href="/">
                                                <a>mtnghana@email.com</a>
                                            </Link>
                                        </li>

                                        {/* toggle light and dark mode */}
                                        <ToggleButton />
                                    </ul>
                                </Container>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

                {/* bottom bar */}
                <div className={styles.bottom__bar}>
                    <div>
                        <Typography variant="h6" component="h6">
                            <Link href={isAdmin ? "/admin" : "/"}>
                                <a>GeofinMaps</a>
                            </Link>
                        </Typography>
                    </div>
                    <CopyRight />
                    <div>
                        <div className="flex">
                            <Link href="/">
                                <a className="text-gray-500 cursor-pointer">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2" className="w-5 h-5 hover:text-blue-700"
                                        viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                                    </svg>
                                </a>
                            </Link>
                            <Link href="/">
                                <a className="ml-3 text-gray-500 cursor-pointer">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2" className="w-5 h-5 hover:text-blue-700"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                                    </svg>
                                </a>
                            </Link>
                            <Link href="/">
                                <a className="ml-3 text-gray-500 cursor-pointer">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-5 h-5 hover:text-blue-700" viewBox="0 0 24 24">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"/>
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;