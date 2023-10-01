import React from "react";
import NavBar from "./component/NavBar";
import Banner from "./component/Banner";

import MovieList from "./component/MovieList ";

function Browse() {
  return (
    <div className="app">
      <NavBar />
      <Banner />
      <MovieList />
    </div>
  );
}

export default Browse;
