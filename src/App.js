import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import MenuBar from "./components/Menu";
import Record from "./components/Record";
import { bodyColor, primaryColor } from "./constants/color";

function App() {
  return (
    <Router>
      <div>
        <MenuBar />
      </div>
      <div
        style={{
          position: "relative",
          top: 60,
          width: '100%',
          minHeight: 'calc(100vh - 60px)',
          backgroundColor: bodyColor
        }}
      >
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/record" exact component={() => <Record />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
