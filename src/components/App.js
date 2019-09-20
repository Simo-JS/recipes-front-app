import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ALL_RECIPES } from "../queries/index";
import RecipeItem from "./RecipeItem";

const App = () => {
  const { data, error, loading, refetch } = useQuery(GET_ALL_RECIPES);
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <ul>
      {data.getAllRecipes.map(recipe => (
        <RecipeItem key={recipe._id} {...recipe} />
      ))}
    </ul>
  );
};

export default App;
