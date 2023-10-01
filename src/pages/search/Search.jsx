import React from "react";
import SearchForm from "./components/SearchForm";
import NavBar from "../browse/component/NavBar";

const Search = () => {
  return (
    <div className="app">
      <NavBar />
      <SearchForm />
    </div>
  );
};

export default Search;
