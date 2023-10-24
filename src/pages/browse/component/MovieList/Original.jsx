import React from "react";
import { useState, useEffect } from "react";

import classes from "../MovieList.module.css";
import MovieDetail from "./MovieDetail";

const baseURL = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original/";

const Original = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movieID, setMovieID] = useState("");
  const [detailedMovie, setDetailedMovie] = useState([]);
  //State click để xem chi tiết của từng movie
  const [isClicked, setIsClicked] = useState(false);
  const [toogleClick, setToggleClick] = useState(true);

  let movieList = [];

  const fetchMovie = async () => {
    const results = await fetch(`${baseURL}${props.request}`);
    const data = await results.json();
    movieList.push(data.results);
    //Lấy 10 movies đầu tiên tìm được
    setMovieData(movieList[0].slice(0, 10));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMovie();
    setIsLoading(false);
  }, []);

  const showMovieHandler = (showedMovie) => {
    setIsClicked(true);
    setDetailedMovie(showedMovie);
    setMovieID(showedMovie.id);
    //Nếu click cùng 1 movie, ẩn phần detail đi và toggle click
    if (showedMovie.id === detailedMovie?.id) {
      //Ẩn hiện chi tiết của movie
      setToggleClick((prevState) => !prevState);
    }
  };
  return (
    <div>
      <div className={classes["original-container"]}>
        {!isLoading &&
          movieData.map((mov, i) => {
            return (
              <div key={i} onClick={() => showMovieHandler(mov)}>
                <img
                  src={`${imgPath}${mov.poster_path}`}
                  style={{ width: "100%" }}
                />
              </div>
            );
          })}
      </div>
      {isClicked && toogleClick && (
        <MovieDetail
          key={Math.random()}
          movieID={movieID}
          movieData={detailedMovie}
        />
      )}
    </div>
  );
};
export default React.memo(Original);
