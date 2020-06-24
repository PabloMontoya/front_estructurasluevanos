import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Core from './Core';

const App = () => {
  return (
    <Router>
      <Switch>
        <Core />
      </Switch>
    </Router>
  );
}

export default App;
