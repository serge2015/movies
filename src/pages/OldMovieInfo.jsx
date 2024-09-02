import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Placeholder from "../assets/placeholder.png";
import blankPlaceholder from '../assets/image-not-available.png';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OldMovieInfo = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  let navigate = useNavigate();
  const backIcon = <FontAwesomeIcon icon={faArrowLeft} />

  async function getMovie(id) {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://search.imdbot.workers.dev/?tt=${id}`
    );
    setMovie(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getMovie(id);
  }, []);

  function getMinutes(seconds) {
    const time = parseInt(seconds);
    return time / 60;
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
                  <p><span className="bold">User Review:</span><span className="blinking-text">Loading...</span> </p>
                </div>
              </>
            ) : (
              <>
                <div className="hold">
                  <div className="movie-card">
                    <div className="movie-card__container">
                      <img 
                      className="movie__img" 
                      src={movie?.short?.image ? `${movie.short.image}` : blankPlaceholder} 
                      alt="Poster" />
                      <h3 className="movie__title">
                        {movie.main.titleText.text}
                        <span className="lighter">
                          {" "}{movie?.main?.releaseYear?.year ? 
                          `${movie.main.releaseYear.year}`: "Not available"}
                        </span>
                      </h3>
                      <p className="movie__stars top">
                        <span className="bold">Starring:&nbsp;</span>
                        <span className="inline">
                          {" "}{movie?.short?.actor ? <>
                          {movie.short.actor.map((actor, index) => (
                            <span key={index}>
                              {actor.name}
                              <br />
                            </span>
                          ))}{" "}</>: "Not available"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="movie__details">
                  <p>
                    <span className="bold">Genre(s):</span>{" "}
                    {movie?.short?.genre ? <>
                    {movie.short.genre.map((genre, index) => (
                      <span key={index}>{genre}&nbsp;&nbsp;</span>
                    ))}</>: "Not available"}
                  </p>
                  <p>
                    <span className="bold">Content Rating: </span>{" "}
                    {movie?.short?.contentRating ? `${movie.short.contentRating}` : 'Not available'}
                  </p>
                  <p>
                    <span className="bold">Running Time: </span>{" "}{movie?.main?.runtime?.seconds ? `${getMinutes(`${movie.main.runtime.seconds}`)} minutes`: "Not available"}
                  </p>
                  <p>
                    <span className="bold">Directed by: </span>
                    { movie?.top?.principalCredits[0]?.credits[0]?.name?.nameText ? `${movie.top.principalCredits[0].credits[0].name.nameText
                        .text}`:  "Not available" }
                  </p>
                  <p>
                    <span className="bold">Written by: </span>
                    { movie?.top?.principalCredits[1]?.credits[0]?.name?.nameText ? `${movie.top.principalCredits[1].credits[0].name.nameText
                        .text}`:  "Not available" }
                  </p>
                  <p>
                    <span className="bold">Aggregate Rating: </span>{" "}
                    {movie?.top?.ratingsSummary?.aggregateRating ? `${movie.top.ratingsSummary.aggregateRating}/10`: "Not available"}    
                  </p>
                  <p>
                    <span className="bold">Description: </span>{" "}{movie?.short?.description ? `${htmlDecode(`${movie.short.description}`)}`: "Not available"}
                    
                  </p>
                  <p>
                    <span className="bold">User Review: </span>{" "}{movie?.short?.review?.reviewBody ? `${htmlDecode(`${movie.short.review.reviewBody}`)}`: "Not available"}{" "}<span className="bold">by</span>{" "}{movie?.short?.review?.author?.name ? `${movie.short.review.author.name}`: "Not available"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OldMovieInfo