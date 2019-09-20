import React, { useState } from "react";

import { ApolloConsumer } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "auto"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

const SearchInput = props => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ApolloConsumer>
      {client => (
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            onChange={event => {
              event.persist();
              setSearchTerm(event.target.value);
            }}
            placeholder="Search..."
          />
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              props.onSearch(client, searchTerm);
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      )}
    </ApolloConsumer>
  );
};

export default SearchInput;
