import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ searchResults }) => {
  return (
    <ul>
      {searchResults.map(recipe => (
        <li key={recipe._id}>
          <h2>
            <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
          </h2>

          <p>Likes: {recipe.likes}</p>
        </li>
      ))}
    </ul>
  );
};

export default SearchResult;
