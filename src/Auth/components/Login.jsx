import React from 'react';
import { Box, TextField, Button, Typography, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import useSignIn from '../hooks/useSignIn';
import { useRecoilState } from 'recoil';
import { authEmailState, authPasswordState } from '../store';
import useTitle from '~/hooks/useTitle';
import { PAGES, PUBLIC_ROUTES } from '~/Layout/constant';

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto'
  },
  formItem: {
    marginBottom: spacing(2),
    width: '300px'
  },

}))

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useRecoilState(authEmailState);
  const [password, setPassword] = useRecoilState(authPasswordState);
  const signIn = useSignIn();

  useTitle(PAGES.Login);

  return <Box className={classes.wrapper}>
    <TextField
      className={classes.formItem}
      label="Login"
      type="email"
      variant="outlined"
      size="small"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <TextField
      className={classes.formItem}
      label="Password"
      type="password"
      variant="outlined"
      size="small"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <Button
      className={classes.formItem}
      variant="contained"
      color="primary"
      disabled={!email.length || !password.length}
      onClick={signIn}>Sign In</Button>
    <Box mt={2}>
      <Typography variant='body2' className={classes.formItem}>
        Do not have account? <NavLink to={`/${PUBLIC_ROUTES.SignUp}`}>Sign Up</NavLink>
      </Typography>
      <Typography variant='body2' >Forgot password? <NavLink to={`/${PUBLIC_ROUTES.ResetPassword}`}>Reset password</NavLink></Typography>
    </Box>
  </Box>
}

export default React.memo(Login);