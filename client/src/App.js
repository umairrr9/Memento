import React from 'react';
import Landing from './pages/Landing';
import Form from './pages/Form';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/form">
            <Form />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
      </Switch>
    </Router>
  )
    
}

export default App;
