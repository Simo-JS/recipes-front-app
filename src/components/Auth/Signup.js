import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Paper, Button } from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";

import { SIGNUP_USER } from "../../queries/index";

const Signup = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signupUser] = useMutation(SIGNUP_USER);

  const submitHandle = () => {
    signupUser({ variables: { username, email, password } }).then(res => {
      console.log(res);
    });
  };

  return (
    <Grid container style={{ justifyContent: "center" }}>
      <Grid item sm={6}>
        <Paper style={{ padding: 15 }}>
          <form>
            <h1 style={{ width: "100%", textAlign: "center" }}>Sign up</h1>
            <TextField
              style={{ width: "100%" }}
              label="Username"
              margin="normal"
              value={username}
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
              }}
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              label="Confirm Password"
              type="password"
              margin="normal"
              value={confirmPassword}
              onChange={event => {
                setConfirmPassword(event.target.value);
              }}
            />
            <br />
            <Button
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
              onClick={submitHandle}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
