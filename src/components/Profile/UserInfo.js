import React from "react";

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString("en-US");
  const newTime = new Date(date).toLocaleTimeString("en-US");
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => {
  const { username, email, joined, favorites } = session.getCurrentUser;
  return (
    <div>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Joined: {formatDate(+joined)}</p>
      <p>{username}'favorites</p>
      <u>
        {favorites.map(recipe => (
          <li key={recipe._id}>{recipe.name}</li>
        ))}
      </u>
      {(!favorites || favorites.length === 0) && (
        <p>You dont have any favorites, add some!</p>
      )}
    </div>
  );
};

export default UserInfo;
