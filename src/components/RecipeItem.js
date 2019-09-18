import React from "react";
import { Link } from "react-router-dom";

const RecipeItem = props => {
  return (
    <li>
      <p>
        <Link to={`/recipe/${props._id}`}>{props.name}</Link>
      </p>
      <strong>{props.category}</strong>
    </li>
  );
};

export default RecipeItem;
