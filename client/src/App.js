import React from "react";
import Landing from "./pages/Landing";
import Form from "./pages/Form";
import Note from "./pages/Note";
import PrintNote from "./pages/PrintNote";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/note">
          <Note />
        </Route>
        <Route path="/print">
          <PrintNote />
        </Route>
        <Route path="/signup">
          <Form isLogin={false} />
        </Route>
        <Route path="/login">
          <Form isLogin={true} />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
