import React, { useCallback } from "react";
import MovieDetail from "./MovieDetail";
import { useState, useEffect, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import classes from "../MovieList.module.css";

const baseURL = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original/";

const Rows = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [movieID, setMovieID] = useState("");
  const [detailedMovie, setDetailedMovie] = useState([]);
  const [toogleClick, setToggleClick] = useState(true);

  const ref = useRef(); // Use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref);
  let movieList = [];
  //Fetch Movie
  const fetchMovie = async () => {
    const results = await fetch(`${baseURL}${props.request}`);
    const data = await results.json();
    movieList.push(data.results);
    setMovieData(movieList[0]);
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

    if (showedMovie.id === detailedMovie?.id) {
      setToggleClick((prevState) => !prevState);
    }
  };

  return (
    <div>
      <div className={classes["movies-container"]} {...events} ref={ref}>
        {isLoading && <p style={{textAlign: 'center'}}>Loading...</p>}
        {!isLoading &&
          movieData.map((mov, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  showMovieHandler(mov);
                }}
              >
                <img
                  src={`${imgPath}${mov.backdrop_path}`}
                  style={{ width: "13.5vw" }}
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
          className={classes["movie-detail"]}
        />
      )}
    </div>
  );
};
export default React.memo(Rows);
