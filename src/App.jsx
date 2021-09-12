import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './Home/components/Home';
import Profile from './Profile/components/Profile';
import ResumeList from './List/components/ResumeList';
import Layout from '~/Layout/components/Layout';

const App = () => {
  return (
    <>
      <CssBaseline />
      <React.StrictMode>
        <Router basename="/">
          <Switch>
            <Layout>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/list">
                <ResumeList />
              </Route>
              <Redirect from="*" to="/home" />
            </Layout>
          </Switch>
        </Router>
      </React.StrictMode>
    </>
  );
};

export default App;
