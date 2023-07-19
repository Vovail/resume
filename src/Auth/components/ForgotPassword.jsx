import React, { useCallback, useState } from 'react';
import { Box, TextField, Button, Typography, makeStyles } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authEmailState, authPasswordState, resetPasswordCodeState, sendResetPasswordCodeState } from '../store';
import useTitle from '~/hooks/useTitle';
import { PAGES, PUBLIC_ROUTES } from '~/Layout/constant';
import usePasswordReset from '../hooks/usePasswordReset';

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

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useRecoilState(authEmailState);
  const [password, setPassword] = useRecoilState(authPasswordState);
  const [resetPasswordCode, setResetPasswordCode] = useRecoilState(resetPasswordCodeState);
  const [isSendResetPasswordCode, setIsSendResetPasswordCode] = useRecoilState(sendResetPasswordCodeState);
  const { passwordReset, confirmPasswordReset } = usePasswordReset();
  const [emailError, setEmailError] = useState(null);

  useTitle(PAGES.ResetPassword);

  const handlePasswordReset = useCallback(async () => {
    try {
      await passwordReset(email);
      setEmailError(null);
    } catch (error) {
      setEmailError(error.message || 'Can not send code for password reset');
    }
  }, [email]);

  const handleConfirmPasswordReset = useCallback(async () => {
    await confirmPasswordReset(resetPasswordCode, password);
    setIsSendResetPasswordCode(false);
    history.push(`/${PUBLIC_ROUTES.Login}`);
  }, [email, password]);


  return <Box className={classes.wrapper}>
    <Typography variant='h5' className={classes.formItem}>Reset Password</Typography>
    <TextField
      className={classes.formItem}
      label="Email"
      type="email"
      variant="outlined"
      size="small"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={!!emailError}
      helperText={emailError || ''}
    />
    {isSendResetPasswordCode && <>
      <Typography variant='caption' className={classes.formItem}>
        We have sent code to your email
      </Typography>
      <TextField
        className={classes.formItem}
        label="Confirmation code"
        variant="outlined"
        size="small"
        required
        value={resetPasswordCode}
        onChange={(e) => setResetPasswordCode(e.target.value)}
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
      /></>}
    <Button
      className={classes.formItem}
      variant="contained"
      color="primary"
      disabled={isSendResetPasswordCode ? !password.length || !resetPasswordCode.length : !email.length}
      onClick={isSendResetPasswordCode ? handleConfirmPasswordReset : handlePasswordReset}>
      {isSendResetPasswordCode ? 'Confirm new password' : 'Reset password'}
    </Button>
    <Box mt={2}>
      <Typography>Already have an account? <NavLink to={`/${PUBLIC_ROUTES.Login}`}>Sign In</NavLink></Typography>
    </Box>
  </Box>
}

export default React.memo(ForgotPassword);