import React from "react";

import { Link } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";

import { GET_USER_RECIPES } from "../../queries/index";

const UserRecipes = ({ username }) => {
  const { data, error, loading } = useQuery(GET_USER_RECIPES, {
    variables: {
      username
    }
  });
  if (error) return <p>{error.message}</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h2>User recipes</h2>
      <ul>
        {" "}
        {data.getUserRecipes.map(recipe => (
          <li key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`}> {recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRecipes;
