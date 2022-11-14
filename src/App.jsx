import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
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
      {isConfigured && (
        <Router basename="/">
          <Layout>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<CircularProgress color="secondary" />}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="/list"
                element={
                  <Suspense fallback={<CircularProgress color="secondary" />}>
                    <ResumeList />
                  </Suspense>
                }
              />
              <Route path="*" element={<Navigate to='/home' />} />
            </Routes>
          </Layout>
        </Router>
      )}
    </>
  );
};

export default App;
