import React from "react";
import {HeadTag, Layout} from "../global/global";
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from "../provider/createEmotionCache";
import {AppState} from "../provider/AppState";
import reducer, {initialState} from "../provider/Reducer";
import '../styles/globals.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
      <>
        <CacheProvider value={emotionCache}>
          <HeadTag/> {/*handles seo*/}
            <AppState initialState={initialState} reducer={reducer}> {/*the data layer to handle state*/}
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Layout> {/*global layout*/}
                <Component {...pageProps} /> {/*page component and its props*/}
              </Layout>
            </AppState>
        </CacheProvider>
      </>
  );
}

// main prop types of most pages
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
