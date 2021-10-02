import React from "react";
import {HeadTag, Layout} from "../global/global";
import {AppState} from "../provider/AppState";
import reducer, {initialState} from "../provider/Reducer";
import '../styles/globals.css';
import PropTypes from "prop-types";

function MyApp(props) {
  const {Component, pageProps} = props;

  return (
      <>
        <HeadTag/> {/*handles seo*/}
          <AppState initialState={initialState} reducer={reducer}> {/*the data layer to handle state*/}
            <Layout> {/*global layout*/}
              <Component {...pageProps} /> {/*page component and its props*/}
            </Layout>
          </AppState>
      </>
  );
}

// main prop types of most pages
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
