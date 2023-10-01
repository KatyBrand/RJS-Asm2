import React from "react";
import { useState, useEffect } from "react";
import classes from "../MovieList.module.css";

const API_KEY = "637c616b4795dce2a19155ec194865a7";
const imgPath = "https://image.tmdb.org/t/p/original/";

const MovieDetail = (props) => {
  //Biến key cho key của Youtube Link
  const [key, setKey] = useState("");
  //Biến check lỗi
  const [hasError, setHasError] = useState(false);

  const movie = props.movieData;
  const movieID = props.movieID;

  //Get key for Youtube link
  useEffect(() => {
    const showVideo = async () => {
      const results = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}`
      );
      const data = await results.json();
      if (!data) {
        setHasError(true);
      }
      if (data.results?.length > 0 || data.success) {
        //Filter movie có trailer ở Youtube
        const movieFound = data.results.filter(
          (m) => m.site === "YouTube" && m.type === "Trailer"
        );
        //Nếu tìm được, lấy movie đầu tiêu; Nếu ko tìm được, lấy key của results đầu tiên
        if (movieFound.length > 0) {
          setKey(movieFound[0].key);
        } else {
          setKey(data.results[0].key);
        }
      }
    };
    showVideo();
  }, []);
  //Trailer của movie
  let trailer = (
    <iframe
      frameBorder="0"
      width="100%"
      height="350px"
      src={`https://www.youtube.com/embed/${key}`}
    ></iframe>
  );
  //Nếu ko tìm trailer - thay bằng poster
  //Nếu ko có poster thì thay bằng ảnh mặc định Netflix
  if (!key) {
    if (!movie.poster_path) {
      trailer = (
        <img
          src={`https://w0.peakpx.com/wallpaper/384/624/HD-wallpaper-netflix-logo-black-logo-netflix-pro-red.jpg`}
          style={{ width: "50%", display: "block", margin: "auto" }}
        />
      );
    } else {
      trailer = (
        <img
          src={`${imgPath}${movie.poster_path}`}
          style={{ width: "50%", display: "block", margin: "auto" }}
        />
      );
    }
  }

  return (
    <div>
      {hasError && <p>Something went wrong!</p>}
      {!hasError && (
        <div className={classes["detail-movie_container"]}>
          <div>
            <div className={classes["movie-detail_title"]}>
              {/* Tên thay thế trong trường hợp data khác nhau */}
              {movie.original_title || movie.name || movie.original_name}
            </div>
            <div className={classes["movie-detail_header"]}>
              Release Date: {movie.release_date}
            </div>
            <div className={classes["movie-detail_header"]}>
              Vote: {movie.vote_average}/10
            </div>
            <div className={classes["movie-detail_overview"]}>
              {movie.overview}
            </div>
          </div>
          <div>{trailer}</div>
        </div>
      )}
    </div>
  );
};
export default React.memo(MovieDetail);
