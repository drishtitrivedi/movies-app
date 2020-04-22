import React from "react";
import { Route, Redirect } from "react-router-dom";

import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";

function App() {
  return (
    <main className="container">
      <Route path="/movies" components={Movies}></Route>
      <Route path="/customers" components={Customers}></Route>
      <Route path="/rentals" components={Rentals}></Route>
      <Route path="/not-found" components={NotFound}></Route>

      <Redirect from="/" to="/movies" />
    </main>
  );
}

export default App;
