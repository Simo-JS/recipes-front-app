import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Header from "./components/Header";
import Search from "./components/Search";
import AddRecipe from "./components/AddRecipe";
import RecipeDetail from "./components/RecipeDetail";

import withSession from "./components/withSession";

import * as serviceWorker from "./serviceWorker";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Profile from "./components/Profile";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? token : ""
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }
  }
});

const Root = props => (
  <BrowserRouter>
    <Header session={props.session} />
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/search" component={Search} />
      <Route path="/profile" component={Profile} />
      <Route
        path="/recipe/add"
        render={() => <AddRecipe session={props.session} />}
      />
      <Route path="/recipe/:_id" component={RecipeDetail} />
      <Route path="/signin" render={() => <Signin refetch={props.refetch} />} />
      <Route path="/signup" render={() => <Signup refetch={props.refetch} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
