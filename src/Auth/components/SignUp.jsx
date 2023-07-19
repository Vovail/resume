import React from 'react';
import { Box, TextField, Button, Typography, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';
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
  }
}))

const SignUp = () => {
  const classes = useStyles();
  const [email, setEmail] = useRecoilState(authEmailState);
  const [password, setPassword] = useRecoilState(authPasswordState);
  const signUp = useSignUp();

  useTitle(PAGES.SignUp);

  return <Box className={classes.wrapper}>
    <Typography variant='h5' className={classes.formItem}>Create an account</Typography>
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
      onClick={signUp}>Sign Up</Button>
    <Box mt={2}>
      <Typography>Already have an account? <NavLink to={`/${PUBLIC_ROUTES.Login}`}>Sign In</NavLink></Typography>
    </Box>
  </Box>
}

export default React.memo(SignUp);