import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.scss";
import Brew from "./components/pages/Brew";

function App() {
  return (
    <Router
      basename={
        process.env.NODE_ENV === "production"
          ? process.env.PUBLIC_URL
          : undefined
      }
    >
      <Switch>
        <Route path="/brew">
          <Brew />
        </Route>
        <Redirect to="/brew" />
      </Switch>
    </Router>
  );
}

export default App;
