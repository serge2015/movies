import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Placeholder from "../assets/placeholder.png";
import blankPlaceholder from '../assets/image-not-available.png';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieInfo = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  let navigate = useNavigate();
  const backIcon = <FontAwesomeIcon icon={faArrowLeft} />

  async function getMovie(id) {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=4cfe7eb4&i=${id}&plot=full`
    );
    setMovie(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getMovie(id);
  }, []);

  function getYear(date) {
    const year = date.slice(7, 11);
    return year;
  }

  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  return (
    <>
      <div className="container">
        <div className="row">
        <button className='back' onClick={() => navigate(-1)}>{backIcon}&nbsp;&nbsp;Back</button> 
          <div className="movies">
            {isLoading ? (
              <>
                <div className="hold">
                  <div className="movie-card">
                    <div className="movie-card__container">
                      <img
                        className="movie__img"
                        src={Placeholder}
                        alt="Placeholder"
                      />
                      <h3 className="movie__skeleton">Title:<span className="blinking-text lighter">Loading...</span></h3>
                      <h4 className="movie__skeleton">Starring:<span className="blinking-text">Loading...</span></h4>
                    </div>
                  </div>
                </div>
                <div className="movie__details">
                  <p><span className="bold">Genre(s):</span><span className="blinking-text">Loading...</span></p>
                  <p><span className="bold">Content Rating:</span><span className="blinking-text">Loading...</span> </p>
                  <p><span className="bold">Running Time:</span> <span className="blinking-text">Loading...</span></p>
                  <p><span className="bold">Directed by:</span><span className="blinking-text">Loading...</span> </p>
                  <p><span className="bold">Written by:</span><span className="blinking-text">Loading...</span> </p>
                  <p><span className="bold">Aggregate Rating:</span><span className="blinking-text">Loading...</span> </p>
                  <p><span className="bold">Description:</span><span className="blinking-text">Loading...</span> </p>
                </div>
              </>
            ) : (
              <>
                <div className="hold">
                  <div className="movie-card">
                    <div className="movie-card__container">
                    <img className="movie__img" src={movie.Poster !== "N/A" ? `${movie.Poster}` : blankPlaceholder} alt="Poster" />
                      <h3 className="movie__title">
                        {movie.Title}
                        <span className="lighter">
                          {" "}{movie?.Released ? 
                          `(${getYear(`${movie.Released}`)})`: "Not available"}
                        </span>
                      </h3>
                      <p className="movie__stars top">
                        <span className="bold">Starring:&nbsp;</span>
                        <span className="block">
                          {" "}{movie?.Actors ? <>
                          {movie.Actors.split(', ').map((actor, index) => (
                            <span key={index}>
                              {actor}
                              <br />
                            </span>))}</>: "Not available"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="movie__details">
                  <p>
                    <span className="bold">Genre(s):</span>{" "}
                    {movie?.Genre ? `${movie.Genre}`: "Not available"}
                  </p>
                  <p>
                    <span className="bold">Content Rating: </span>{" "}
                    {movie?.Rated ? `${movie.Rated}` : 'Not available'}
                  </p>
                  <p>
                    <span className="bold">Running Time: </span>{" "}{movie?.Runtime ? `${movie.Runtime}utes`: "Not available"}
                  </p>
                  <p>
                    <span className="bold">Directed by: </span>
                    { movie?.Director ? `${movie.Director}`:  "Not available" }
                  </p>
                  <p>
                    <span className="bold">Written by: </span>
                    { movie?.Writer ? `${movie.Writer}`:  "Not available" }
                  </p>
                  <p>
                    <span className="bold">Aggregate Rating: </span>{" "}
                    {movie?.imdbRating ? `${movie.imdbRating}/10`: "Not available"}    
                  </p>
                  <p>
                    <span className="bold">Description: </span>{" "}{movie?.Plot ? `${htmlDecode(`${movie.Plot}`)}`: "Not available"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
