import React from "react";
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

const AddRecipe = () => {
  return (
    <Grid container style={{ justifyContent: "center" }}>
      <Grid item sm={8}>
        <Paper style={{ padding: 15 }}>
          <form>
            <h1 style={{ width: "100%", textAlign: "center" }}>
              Add new recipe
            </h1>
            <TextField style={{ width: "100%" }} label="Name" margin="normal" />
            <br />
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Category</InputLabel>
              <Select value={10}>
                <MenuItem value={10}>Breakfast</MenuItem>
                <MenuItem value={20}>Lunch</MenuItem>
                <MenuItem value={30}>Dinner</MenuItem>
                <MenuItem value={40}>Snack</MenuItem>
              </Select>
            </FormControl>
            <br />
            <TextField
              style={{ width: "100%" }}
              label="Description"
              margin="normal"
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              label="Instructions"
              multiline
              rowsMax="4"
              margin="normal"
            />
            <br />
            <Button
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
            >
              ADD
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddRecipe;
