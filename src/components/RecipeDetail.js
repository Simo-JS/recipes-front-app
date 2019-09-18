import React from "react";
import { withRouter } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";

import { GET_RECIPE } from "../queries/index";

const RecipeDetail = props => {
  const { _id } = props.match.params;
  const { data, error, loading } = useQuery(GET_RECIPE, {
    variables: {
      _id
    }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2>
        <strong>name:</strong>
        {data.getRecipe.name}
      </h2>
      <p>
        <strong>category:</strong>
        {data.getRecipe.category}
      </p>
      <p>
        <strong>description:</strong>
        {data.getRecipe.description}
      </p>
      <p>
        <strong>instructions:</strong>
        {data.getRecipe.instructions}
      </p>
      <p>
        <strong>likes:</strong>
        {data.getRecipe.likes}
      </p>
      <p>
        <strong>username:</strong>
        {data.getRecipe.username}
      </p>
      <p>
        <strong>created:</strong>
        {data.getRecipe.created}
      </p>
    </div>
  );
};

export default withRouter(RecipeDetail);
