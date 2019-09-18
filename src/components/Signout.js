import React from "react";
import { withRouter } from "react-router-dom";
import { ApolloConsumer } from "@apollo/react-hooks";
import { MenuItem } from "@material-ui/core";

const Signout = props => {
  return (
    <ApolloConsumer>
      {client => {
        return (
          <MenuItem onClick={() => props.clicked(client, props.history)}>
            Sign out
          </MenuItem>
        );
      }}
    </ApolloConsumer>
  );
};

export default withRouter(Signout);
