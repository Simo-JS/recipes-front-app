import React from "react";

import { Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  GET_USER_RECIPES,
  DELETE_RECIPE,
  GET_CURRENT_USER
} from "../../queries/index";

const UserRecipes = ({ username }) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const query = useQuery(GET_USER_RECIPES, {
    variables: {
      username
    }
  });
  const deleteHandle = _id => {
    deleteRecipe({
      variables: { _id },
      refetchQueries: [
        {
          query: GET_CURRENT_USER
        }
      ],
      optimisticResponse: {
        __typename: "Mutation",
        deleteRecipe: {
          __typename: "Recipe",
          _id
        }
      },
      update: (cache, { data: { deleteRecipe } }) => {
        const { getUserRecipes } = cache.readQuery({
          query: GET_USER_RECIPES,
          variables: { username }
        });
        cache.writeQuery({
          query: GET_USER_RECIPES,
          variables: { username },
          data: {
            getUserRecipes: getUserRecipes.filter(
              recipe => recipe._id !== deleteRecipe._id
            )
          }
        });
      }
    }).then(response => {
      console.log("DELETED_RECIPE", response.data);
    });
  };
  if (query.error) return <p>{query.error.message}</p>;
  if (query.loading) return <p>Loading...</p>;
  return (
    <div>
      <h2>User recipes</h2>
      {query.data.getUserRecipes.length === 0 && (
        <p>You did not add any recipes yet</p>
      )}
      <ul>
        {query.data.getUserRecipes.map(recipe => (
          <li key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`}> {recipe.name}</Link>
            <button onClick={() => deleteHandle(recipe._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRecipes;
