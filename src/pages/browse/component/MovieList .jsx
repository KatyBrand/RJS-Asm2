import React from "react";
import Original from "./MovieList/Original.jsx";
import Rows from "./MovieList/Rows";
import classes from "./MovieList.module.css";

const API_KEY = "637c616b4795dce2a19155ec194865a7";
const request = {
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
const MovieList = () => {
  return (
    <div className={classes["movielist-container"]}>
      <Original request={request.fetchNetflixOriginals} key={Math.random()} />
      <div>
        <div className={classes["movie-type-title"]}>Trend</div>
        <Rows request={request.fetchTrending} key={Math.random()} />
      </div>
      <div>
        <div className={classes["movie-type-title"]}>Top-rated</div>
        <Rows request={request.fetchTopRated} key={Math.random()} />
      </div>
      <div>
        <div className={classes["movie-type-title"]}>Action</div>
        <Rows request={request.fetchActionMovies} key={Math.random()} />
      </div>
      <div>
        <div className={classes["movie-type-title"]}>Comedy</div>
        <Rows request={request.fetchComedyMovies} key={Math.random()} />
      </div>
      <div>
        <div className={classes["movie-type-title"]}>Horror</div>
        <Rows request={request.fetchHorrorMovies} key={Math.random()} />
      </div>
      <div>
        <div className={classes["movie-type-title"]}>Romantic</div>
        <Rows request={request.fetchRomanceMovies} key={Math.random()} />
      </div>
      <div>
        <div className={classes["movie-type-title"]}>Documentary</div>
        <Rows request={request.fetchDocumentaries} key={Math.random()} />
      </div>
    </div>
  );
};
export default MovieList;
