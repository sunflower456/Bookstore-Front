import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {LoginPage} from './features/Pages';

function App() {
  return (
      <Switch>
          <Route exact path={'/'} component={LoginPage} />
      </Switch>
  );
}

export default App;