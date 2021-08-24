import React, {useEffect} from "react";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles'; // material ui appTheme provider
import appTheme from "../provider/AppTheme"; //handle material ui theme
import {HeadTag, Layout} from "../global/global";
import {AppState} from "../provider/AppState";
import reducer, {initialState} from "../provider/Reducer";
import '../styles/globals.css';
import PropTypes from "prop-types";

function MyApp(props) {
  const {Component, pageProps} = props;

  // handle server side rendering of material ui styles
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
      <>
        <HeadTag/> {/*handles seo*/}
        <ThemeProvider theme={appTheme}>  {/*handle SSR with material ui styles and appTheme*/}
          <CssBaseline/> {/*handle baseline material ui styles*/}
          <AppState initialState={initialState} reducer={reducer}> {/*the data layer to handle state*/}
            <Layout> {/*global layout*/}
              <Component {...pageProps} /> {/*page component and its props*/}
            </Layout>
          </AppState>
        </ThemeProvider>
      </>
  );
}

// main prop types of most pages
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
