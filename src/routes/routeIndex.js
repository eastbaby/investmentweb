import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Position from '../pages/position';
import TradeList from '../pages/tradeList';
import Transfer from '../pages/transfer';

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/position">
            <Position />
          </Route>
          <Route path="/trade">
            <TradeList />
          </Route>
          <Route path="/transfer">
            <Transfer />
          </Route>
          <Redirect to="/position" />
          {/* <Route path="/">
            <Home />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}