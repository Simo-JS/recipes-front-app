import React from "react";
import UserInfo from "./UserInfo";
import UserRecipes from "./UserRecipes";

const Profile = props => {
  return (
    <div>
      <h2>Profile Page</h2>
      <UserInfo session={props.session} />
      <UserRecipes username={props.session.getCurrentUser.username} />
    </div>
  );
};

export default Profile;
