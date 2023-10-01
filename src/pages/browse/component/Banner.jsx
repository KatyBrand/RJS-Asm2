import React, { useState } from "react";
import { useEffect } from "react";
import classes from "./Banner.module.css";

const baseURL = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original/";
const API_KEY = "637c616b4795dce2a19155ec194865a7";

const request = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

const Banner = () => {
  //Movie hiện trong Banner
  const [movie, setMovie] = useState({});

  useEffect(() => {
    //Get Data
    const fetchNetflixOriginals = async () => {
      const result = await fetch(`${baseURL}${request.fetchNetflixOriginals}`);
      const data = await result.json();
      //Get Random Movie
      const randomMovie =
        data.results[Math.floor(Math.random() * data.results.length - 1)];
      setMovie(randomMovie);
    };
    fetchNetflixOriginals();
  }, []);
  //Func rút ngắn description của movie nếu nó quá dài
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  //Get link backdrop của movie
  const movieImg = `${imgPath}${movie.backdrop_path}`;
  return (
    <div
      style={{
        backgroundImage: `url(${movieImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className={classes["banner-container"]}>
        <div className={classes["banner-title"]}>{movie.name}</div>
        <div className={classes["button-container"]}>
          <button>Play</button>
          <button>My List</button>
        </div>
        <div className={classes["banner-description"]}>
          {truncate(movie?.overview, 150)}
        </div>
      </div>
    </div>
  );
};
export default Banner;
