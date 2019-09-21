import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import Signout from "./Signout";

import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  MenuItem
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const Header = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(client) {
    setAnchorEl(null);
  }
  function handleSignout(client, history) {
    setAnchorEl(null);
    localStorage.setItem("token", "");
    client.resetStore();
    history.push("/");
  }

  return (
    <AppBar position="static" style={{ marginBottom: 20 }}>
      <Toolbar>
        <Typography variant="h6" style={{ marginRight: 20 }}>
          <NavLink to="/" style={{ textDecoration: "none", color: "unset" }}>
            Home
          </NavLink>
        </Typography>
        {props.session && props.session.getCurrentUser && (
          <Typography variant="h6" style={{ marginRight: 20 }}>
            <NavLink
              to="/recipe/add"
              style={{ textDecoration: "none", color: "unset" }}
            >
              Add recipe
            </NavLink>
          </Typography>
        )}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <NavLink
            to="/search"
            style={{ textDecoration: "none", color: "unset" }}
          >
            Search
          </NavLink>
        </Typography>
        {!props.session.getCurrentUser && (
          <>
            <Button color="inherit" component={AdapterLink} to="/signin">
              Sign in
            </Button>
            <Button color="inherit" component={AdapterLink} to="/signup">
              Sign up
            </Button>
          </>
        )}

        {props.session && props.session.getCurrentUser && (
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={AdapterLink}
                to="/profile"
              >
                Profile
              </MenuItem>
              <Signout clicked={handleSignout} />
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
