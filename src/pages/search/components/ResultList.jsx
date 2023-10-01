import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import classes from "./ResultList.module.css";
import MovieDetail from "../../browse/component/MovieList/MovieDetail";

const API_KEY = "637c616b4795dce2a19155ec194865a7";
const imgPath = "https://image.tmdb.org/t/p/original/";

const ResultList = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [toogleClick, setToggleClick] = useState(true);
  const [detailedMovie, setDetailedMovie] = useState([]);
  const [movieID, setMovieID] = useState("");

  const movies = props.data;

  const showMovieHandler = useCallback(
    (movieIDFound) => {
      // scroll để dễ nhìn sau khi click vào movie
      window.scrollTo({ top: 180, left: 0, behavior: "smooth" });

      setMovieID(movieIDFound);
      setIsClicked(true);
      //Khi user click cùng movie, ẩn hiện Movie Detail
      if (movieIDFound === movieID) {
        setToggleClick((prevState) => !prevState);
      }
      //Fetch Movie
      const showDetailedHandler = async () => {
        const results = await fetch(
          `https://api.themoviedb.org/3/movie/${movieIDFound}?api_key=${API_KEY}`
        );
        const response = await results.json();
        setDetailedMovie(response);
      };
      showDetailedHandler();
    },
    [movieID]
  );
  //Poster mặc định
  let img = (
    <img
      src={`https://w0.peakpx.com/wallpaper/384/624/HD-wallpaper-netflix-logo-black-logo-netflix-pro-red.jpg`}
      style={{
        width: "100%",
        maxHeight: "82%",
        display: "block",
        textAlign: "center",
      }}
    />
  );

  return (
    <div>
      <div className={classes["max-content"]}>
        {isClicked && toogleClick && <MovieDetail movieData={detailedMovie} />}
      </div>
      <div className={classes["result-container"]}>
        {movies.map((m) => {
          return (
            <div onClick={() => showMovieHandler(m.id)} key={Math.random()}>
              {!m.poster_path ? (
                img
              ) : (
                <img src={`${imgPath}${m.poster_path}`}></img>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default React.memo(ResultList);
