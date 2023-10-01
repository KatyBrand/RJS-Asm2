import React from "react";
import classes from "./SearchForm.module.css";
import { useState } from "react";
import ResultList from "./ResultList";

const API_KEY = "637c616b4795dce2a19155ec194865a7";

const SearchForm = () => {
  const [enteredSearchTerm, setEnteredSearchTerm] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasNoResults, setHasNoResults] = useState(false);

  //Get input data
  const searchItemHandler = (e) => {
    setEnteredSearchTerm(e.target.value);
    if (e.target.value.trim() !== "") {
      setIsEmpty(false);
    }
  };

  const searchHandler = () => {
    //Validation
    if (enteredSearchTerm.trim() === "") {
      setIsEmpty(true);
      return;
    }
    //Fetch movie theo từ khóa user search
    const fetchSearch = async () => {
      const results = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${enteredSearchTerm}&language=en-US&page=1`
      );
      const data = await results.json();
      setMovieData(data.results);

      if (!data.results) {
        setHasNoResults(true);
      }
    };
    fetchSearch();
  };

  return (
    <div>
      <div className={classes["searchform-big_container"]}>
        <div className={classes["searchform-container"]}>
          <div className={classes["input-svg_container"]}>
            <input
              type="text"
              style={{ display: "table-cell", width: "100%" }}
              value={enteredSearchTerm}
              onChange={searchItemHandler}
            ></input>
            <div className={classes["svg-container"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0,0,256,256"
                fill="#CCCCCC"
              >
                <g transform="">
                  <g fill="#CCCCCC" fillRule="nonzero">
                    <g transform="scale(5.12,5.12)">
                      <path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          {/* Khi input trống */}
          {isEmpty && <p>You need to type something!</p>}
          <div className={classes["search-buttons"]}>
            <button className={classes["button-reset"]}>RESET</button>
            <button
              className={classes["button-search"]}
              onClick={searchHandler}
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
      {/* Khi ko có results */}
      {hasNoResults && <p>No movies are found! Try another keyword</p>}
      <ResultList data={movieData} />
    </div>
  );
};
export default SearchForm;
