import React, { useState } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, Menu, MenuItem } from '@material-ui/core';
import TravelShareLogo from '../../images/TravelShareLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.authData);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate('/auth');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <img src={TravelShareLogo} alt="TravelShare Logo" width="50" style={{ marginRight: '10px' }} />
          <Typography variant="h6">TravelShare</Typography>
        </Link>
        <div style={{ flexGrow: 1 }} />
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={user.result.imageUrl} alt={user.result.name} onClick={handleMenuClick} />
            <Typography variant="body1" style={{ margin: '0 10px' }}>
              {user.result.name}
            </Typography>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button component={Link} to="/auth" color="inherit">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
