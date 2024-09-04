import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Placeholder from "../assets/placeholder.png";
import blankPlaceholder from "../assets/image-not-available.png";
import { Slider } from "@mui/material";
import {
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Movies = () => {
  const { keyword } = useParams();
  const [isLoading, setIsLoading] = useState();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [range, setRange] = useState([0, 100]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [maxPages, setMaxPages] = useState(1);
  const minPages = 1;
  let navigate = useNavigate();
  const forwardIcon = <FontAwesomeIcon icon={faArrowRight} />;
  const backIcon = <FontAwesomeIcon icon={faArrowLeft} />;
  let action = "";
  var total = 0;
  var max = 0;
  var pageToDisplay = 0;

  function handleChanges(event, newValue) {
    setRange(newValue);
    setFilteredMovies(
      movies.filter((movie) => {
        return movie.Year >= range[0] + 1924 && movie.Year <= range[1] + 1924;
      })
    );
    if (filteredMovies.length < 1) {
      alert("No movies match your range.");
      setRange([0, 100]);
      setFilteredMovies(movies);
    }
  }

  function getMaxPages(total) {
    max = Math.ceil(total / 10);
    setMaxPages(max);
  }

  function getNewPage(action) {
    if (action === 'forward') {
      pageToDisplay = pageNumber + 1;
    } else {
      pageToDisplay = pageNumber - 1;
    }
    displayPage(pageToDisplay);
  }

  function displayPage(newPage) {
    setPageNumber(newPage);
    getMovies(keyword, newPage);
    setRange([0, 100]);
    setFilter("");
    document.getElementById("order").value = "";
  }

  function filterMovies(filter) {
    setFilter(filter);
    if (filter === "new to old") {
      setSortOrder("Year, New to Old");
      filteredMovies.sort((a, b) => b.Year - a.Year);
      movies.sort((a, b) => b.Year - a.Year);
    } else if (filter === "old to new") {
      setSortOrder("Year, Old to New");
      filteredMovies.sort((a, b) => a.Year - b.Year);
      movies.sort((a, b) => a.Year - b.Year);
    } else if (filter === "a to z") {
      setSortOrder("Title, A to Z");
      filteredMovies.sort((a, b) =>
        a.Title !== b.Title ? (a.Title < b.Title ? -1 : 1) : 0
      );
      movies.sort((a, b) =>
        a.Title !== b.Title ? (a.Title < b.Title ? -1 : 1) : 0
      );
    } else if (filter === "z to a") {
      setSortOrder("Title, Z to A");
      filteredMovies.sort((a, b) =>
        b.Title !== a.Title ? (b.Title < a.Title ? -1 : 1) : 0
      );
      movies.sort((a, b) =>
        b.Title !== a.Title ? (b.Title < a.Title ? -1 : 1) : 0
      );
    }
  }

  async function getMovies(keyword, pageNumber) {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=4cfe7eb4&s=${keyword}&type=movie&page=${pageNumber}`
    );
    total = data.totalResults;
    getMaxPages(total);
    setMovies(data.Search);
    setFilteredMovies(data.Search);
    setIsLoading(false);
  }

  useEffect(() => {
    getMovies(keyword, pageNumber);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="searchbar">
            <div className="search__options">
              Search results for&nbsp;<span className="bold">{keyword}</span>
            </div>
            <div className="search__options">
              {pageNumber > 1 ?
              <button className="back" value={pageNumber} onClick={() => getNewPage('back')}>{backIcon}</button>: ''}
              Page {pageNumber} of {maxPages}
              {pageNumber < maxPages ?
              <button className="forward" value={pageNumber} onClick={() => getNewPage('forward')}>{forwardIcon}</button>: ''}
            </div>
          </div>
          <div className="searchbar level2">
            <div className="center search__options">
              Filter by year {range[0] + 1924} - {range[1] + 1924}
              <div className="slide__container">
                <Slider
                  value={[range[0], range[1]]}
                  onChange={handleChanges}
                  valueLabelDisplay="off"
                  className="slidecontainer"
                />
              </div>
            </div>
            <div className="search__options">
              <select
                id="order"
                onChange={(event) => filterMovies(event.target.value)}
              >
                <option value="" disabled selected>
                  Sort by
                </option>
                <option value="new to old">Year, New to Old</option>
                <option value="old to new">Year, Old to New</option>
                <option value="a to z">Title, A to Z</option>
                <option value="z to a">Title, Z to A</option>
              </select>
            </div>
          </div>
          <div className="movies">
            {isLoading && pageNumber === 1
              ? new Array(10).fill(0).map((_, index) => (
                  <div className="movie" key={index}>
                    <div className="movie-card">
                      <div className="movie-card__container">
                        <img
                          className="movie__img"
                          src={Placeholder}
                          alt="Placeholder"
                        />
                        <h3 className="movie__skeleton">
                          Title:
                          <span className="blinking-text lighter">
                            Loading...
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))
              : filteredMovies.map((movie) => (
                  <div
                    className="movie"
                    key={movie.imdbID}
                    onClick={() => navigate(`/${movie.imdbID}`)}
                  >
                    <div className="movie-card">
                      <div className="movie-card__container">
                        <img
                          className="movie__img"
                          src={
                            movie.Poster !== "N/A"
                              ? `${movie.Poster}`
                              : blankPlaceholder
                          }
                          alt="Poster"
                        />
                        <h3 className="movie__title">
                          {movie.Title}
                          <span className="lighter"> ({movie.Year})</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
