import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserContext from "./context/UserContext";
import "./App.css";

import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/profile" component={Profile} />
          {/* <Route exact path="/messages" component={Messages} />  */}
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
