import React from "react";
import { Redirect } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import { GET_CURRENT_USER } from "../queries";

const withAuth = verifyFunc => Component => props => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  if (loading) return null;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      {verifyFunc(data) ? <Component {...props} /> : <Redirect to="/signin" />}
    </>
  );
};

export default withAuth;
