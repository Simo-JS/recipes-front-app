import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_CURRENT_USER } from "../queries/index";

const withSession = Component => {
  return props => {
    const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER);
    if (error) throw new Error("Something went wrong man!");
    if (loading) return null;
    console.log(data);
    return <Component {...props} refetch={refetch} />;
  };
};

export default withSession;
