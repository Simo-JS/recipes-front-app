import React, { useState } from "react";

import { withRouter } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { Grid, Paper, Button } from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";

import { SIGNIN_USER } from "../../queries/index";

const Signin = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signinUser, { loading, error }] = useMutation(SIGNIN_USER);

  const submitHandle = () => {
    signinUser({ variables: { username, password } }).then(({ data }) => {
      localStorage.setItem("token", data.signinUser.token);
      props.refetch();
      props.history.push("/");
      console.log(data);
    });
  };

  return (
    <Grid container style={{ justifyContent: "center" }}>
      <Grid item sm={6}>
        <Paper style={{ padding: 15 }}>
          <form>
            <h1 style={{ width: "100%", textAlign: "center" }}>Sign in</h1>
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
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
            />
            <br />

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
          {error && <p>{error.message}</p>}
          {loading && <p>Loading</p>}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withRouter(Signin);
