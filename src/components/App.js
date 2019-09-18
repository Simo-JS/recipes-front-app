import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ALL_RECIPES } from "../queries/index";

const App = () => {
  const { data, error, loading } = useQuery(GET_ALL_RECIPES);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  return (
    <ul>
      {data.getAllRecipes.map(recipe => (
        <li key={recipe._id}>{recipe.name}</li>
      ))}
    </ul>
  );
};

export default App;
