import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { CircularProgress, CssBaseline } from '@material-ui/core';
import Home from './Home/components/Home';
import Layout from '~/Layout/components/Layout';
import useConfigure from './Auth/hooks/useConfigure';

const Profile = lazy(() => import(/* webpackChunkName: "profile.chunk" */ './Profile/components/Profile'));
const ResumeList = lazy(() => import(/* webpackChunkName: "resume-list.chunk" */ './List/components/ResumeList'));

const App = () => {
  const isConfigured = useConfigure();

  return (
    <>
      <CssBaseline />
      <React.StrictMode>
        {isConfigured && (
          <Router basename="/">
            <Switch>
              <Layout>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/profile">
                  <Suspense fallback={<CircularProgress color="secondary" />}>
                    <Profile />
                  </Suspense>
                </Route>
                <Route path="/list">
                  <Suspense fallback={<CircularProgress color="secondary" />}>
                    <ResumeList />
                  </Suspense>
                </Route>
                <Redirect from="*" to="/home" />
              </Layout>
            </Switch>
          </Router>
        )}
      </React.StrictMode>
    </>
  );
};

export default App;
