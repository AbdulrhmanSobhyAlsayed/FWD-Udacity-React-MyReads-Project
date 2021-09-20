import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import MyReads from "./MyReads";
import Search from "./Search";

const App = () => {
  return (
    <Switch>
      <Route path="/search" component={Search} />
      <Route path="/" component={MyReads} />
    </Switch>
  );
};
export default App;
