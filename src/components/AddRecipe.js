import React, { useEffect, useReducer } from "react";
import { withRouter } from "react-router-dom";

import withAuth from "../hoc/withAuth";

import {
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";

import { ADD_RECIPE, GET_USER_RECIPES } from "../queries/index";

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.value
      };
    case "category":
      return {
        ...state,
        category: action.value
      };
    case "description":
      return {
        ...state,
        description: action.value
      };
    case "instructions":
      return {
        ...state,
        instructions: action.value
      };
    case "username":
      return {
        ...state,
        username: action.value
      };
    default:
      return state;
  }
};

const AddRecipe = props => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    category: "Breakfast",
    description: "",
    instructions: "",
    username: ""
  });

  const [addRecipe, { loading, error }] = useMutation(ADD_RECIPE);

  const { getCurrentUser } = props.session;

  useEffect(() => {
    dispatch({ type: "username", value: getCurrentUser.username });
  }, [dispatch, getCurrentUser]);

  const handleAdd = () => {
    const { name, category, description, instructions, username } = state;
    addRecipe({
      variables: { name, category, description, instructions, username },
      refetchQueries: [
        {
          query: GET_USER_RECIPES,
          variables: { username: getCurrentUser.username }
        }
      ]
    }).then(({ data }) => {
      console.log(data);
      props.history.push("/");
    });
  };

  return (
    <Grid container style={{ justifyContent: "center" }}>
      <Grid item sm={8}>
        <Paper style={{ padding: 15 }}>
          <form>
            <h1 style={{ width: "100%", textAlign: "center" }}>
              Add new recipe
            </h1>
            <TextField
              style={{ width: "100%" }}
              label="Name"
              margin="normal"
              value={state.name}
              onChange={event =>
                dispatch({ type: "name", value: event.target.value })
              }
            />
            <br />
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={state.category}
                onChange={event =>
                  dispatch({ type: "category", value: event.target.value })
                }
              >
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
                <MenuItem value="Snack">Snack</MenuItem>
              </Select>
            </FormControl>
            <br />
            <TextField
              style={{ width: "100%" }}
              label="Description"
              margin="normal"
              value={state.description}
              onChange={event =>
                dispatch({ type: "description", value: event.target.value })
              }
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              label="Instructions"
              multiline
              rowsMax="4"
              margin="normal"
              value={state.instructions}
              onChange={event =>
                dispatch({ type: "instructions", value: event.target.value })
              }
            />
            <br />
            <Button
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
              onClick={handleAdd}
            >
              ADD
            </Button>
          </form>
          {error && <p>{error.message}</p>}
          {loading && <p>Loading</p>}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddRecipe)
);
