import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Core from './Core';
// import Core2 from './Core2';

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
