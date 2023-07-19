import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { CircularProgress, CssBaseline } from '@material-ui/core';
import Home from './Home/components/Home';
import Layout from '~/Layout/components/Layout';
import useConfigure from './Auth/hooks/useConfigure';
import SignUp from './Auth/components/SignUp';
import Login from './Auth/components/Login';
import ForgotPassword from './Auth/components/ForgotPassword';
import Authenticated from './Auth/components/Authenticated';
import { useRecoilValue } from 'recoil';
import { authenticatedUserState } from './Auth/store';
import { AUTHENTICATED_ROUTES, PUBLIC_ROUTES } from './Layout/constant';

const Profile = lazy(() => import(/* webpackChunkName: "profile.chunk" */ './Profile/components/Profile'));
const ResumeList = lazy(() => import(/* webpackChunkName: "resume-list.chunk" */ './List/components/ResumeList'));

const App = () => {
  const isConfigured = useConfigure();
  const authenticatedUser = useRecoilValue(authenticatedUserState);

  return (
    <>
      <CssBaseline />
      {isConfigured && (
        <Router basename="/">
          <Switch>
            <Layout>
              <Route path={`/${PUBLIC_ROUTES.SignUp}`}>
                <SignUp />
              </Route>
              <Route path={`/${PUBLIC_ROUTES.Login}`}>
                <Login />
              </Route>
              <Route path={`/${PUBLIC_ROUTES.ResetPassword}`}>
                <ForgotPassword />
              </Route>
              <Route path={`/${AUTHENTICATED_ROUTES.Home}`}>
                <Authenticated>
                  <Home />
                </Authenticated>
              </Route>
              <Route path={`/${AUTHENTICATED_ROUTES.Profile}`}>
                <Authenticated>
                  <Suspense fallback={<CircularProgress color="secondary" />}>
                    <Profile />
                  </Suspense>
                </Authenticated>
              </Route>
              <Route path={`/${AUTHENTICATED_ROUTES.ResumeList}`}>
                <Authenticated>
                  <Suspense fallback={<CircularProgress color="secondary" />}>
                    <ResumeList />
                  </Suspense>
                </Authenticated>
              </Route>
              <Redirect from="*" to={authenticatedUser ? `/${AUTHENTICATED_ROUTES.Home}` : `/${PUBLIC_ROUTES.Login}`} />
            </Layout>
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
