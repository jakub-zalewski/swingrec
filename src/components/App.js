import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PhotosList from "./PhotosList";
import RouteNotMatched from "./RouteNotMatched";
import Nav from "./Nav";
import DogsMap from "./DogsMap";

class App extends Component {
  render() {
      return (
          <Router>
              <div className="container-fluid">
                  <Nav/>
                  <Switch>
                      <Route key={0} exact path="/" component={PhotosList} />
                      <Route key={1} exact path="/dogs-map" component={DogsMap} />
                      <Route key={1} exact path="/picture-list/author/:author/:authorName" component={PhotosList} />
                      <Route key={2} component={RouteNotMatched} />
                  </Switch>
              </div>
          </Router>
      );
  }
}

export default App;
