import React, { useEffect, useState } from "react";
import "./row.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

/*insted props kemalet extract bemadreg propsn eyetetekemn new. */
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

  const base_url =
    "https://image.tmdb.org/t/p/original"; /*le imajochu new base url from documentation*/

  useEffect(() => {
    (async () => {
      try {
        // console.log(fetchUrl)
        //the minute axios.get snl baseurl n yezenal and fetchUrl degmo as a props yalefechln slhone betekelala url lun agegn n.
        const request = await axios.get(fetchUrl);
        // console.log(request)
        setMovie(request.data.results); //awtto result wst askemeteln then setMovie snl updater functionu movies wst yaderglnal.
      } catch (error) {
        console.log("error", error);
      }
    })(); /*function slehone eyeteranew new ()endiseraln */
  }, [fetchUrl]); //[ezi wst yehone neger kaskemetn depending to ya neger update adrglgn malet new,eziga degmo fetch url lu slemikeyayer]

    const handleClick = (movie) => {
      if (trailerUrl) {
        setTrailerUrl("");
      } else {
        movieTrailer(movie?.title || movie?.name || movie?.original_name).then(
          (url) => {
            console.log(url);
            const urlParams = new URLSearchParams(new URL(url).search);
            console.log(urlParams);
            console.log(urlParams.get("v"));
            setTrailerUrl(urlParams.get("v"));
          }
        );
      }
    };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  /*ke props yemetachw slehoneche be {} eyaskemetnat new titln */
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies?.map((movie, index) => (
          <img
            onClick={() => handleClick(movie)}
            key={index}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row__poster ${
              isLargeRow && "row__posterLarge"
            }`} /*&& if malet sihon islarge kale row_posterLarge yemilewn class add adrg yh class degmo kesr slale yemejemeriaw lay yalewn propertiy override yadergewal*/
          />
        ))}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
