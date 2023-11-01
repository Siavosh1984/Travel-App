import React, { useState } from 'react';
import { Paper, Avatar, Typography, Button, Grid, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth';


import useStyles from './styles';

const Auth = () => {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };



  return (
    <Paper className={classes.paper} elevation={6}>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
      <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <TextField
              name="firstName"
              label="First Name"
              fullWidth
              autoFocus
              onChange={handleChange}
              required
            />
            <TextField name="lastName" label="Last Name" fullWidth onChange={handleChange} />
          </>
        )}
        <TextField
          name="email"
          label="Email Address"
          fullWidth
          onChange={handleChange}
          required
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          fullWidth
          onChange={handleChange}
          required
        />
        {isSignup && (
          <TextField
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            label="Repeat Password"
            fullWidth
            onChange={handleChange}
            required
          />
        )}
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Show Password"
          checked={showPassword}
          onChange={handleShowPassword}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Button>
      
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Auth;
