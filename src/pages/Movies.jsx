import React, { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Placeholder from '../assets/placeholder.png';
import blankPlaceholder from '../assets/image-not-available.png';
import { Slider } from "@mui/material";

const Movies = () => {

    const { keyword } = useParams();
    const [isLoading, setIsLoading] = useState();
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [range, setRange] = useState([0, 100]);
    let navigate = useNavigate();
   
    function handleChanges(event, newValue) {
      setRange(newValue);
      setFilteredMovies(movies.filter((movie) => {
        return movie.Year >= range[0]+1924 && movie.Year <= range[1]+1924;
    }))
    }

    function filterMovies(filter) {
      setFilter(filter);
      if (filter === "new to old") {
        setSortOrder("Year, New to Old");
        filteredMovies.sort((a, b) => b.Year - a.Year)
        movies.sort((a, b) => b.Year - a.Year)
      }
      else if (filter === "old to new") {
        setSortOrder("Year, Old to New");
        filteredMovies.sort((a, b) => a.Year - b.Year)
        movies.sort((a, b) => a.Year - b.Year)
      }
      else if (filter === "a to z") {
        setSortOrder("Title, A to Z");
        filteredMovies.sort((a, b) => a.Title !== b.Title ? a.Title < b.Title ? -1 : 1 : 0)
        movies.sort((a, b) => a.Title !== b.Title ? a.Title < b.Title ? -1 : 1 : 0)
      }
      else if (filter === "z to a") {
        setSortOrder("Title, Z to A");
        filteredMovies.sort((a, b) => b.Title !== a.Title ? b.Title < a.Title ? -1 : 1 : 0)
        movies.sort((a, b) => b.Title !== a.Title ? b.Title < a.Title ? -1 : 1 : 0)
      }
    }
    
    async function getMovies(keyword) {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://www.omdbapi.com/?apikey=4cfe7eb4&s=${keyword}&type=movie&page=1`);
        setMovies(data.Search);
        setFilteredMovies(data.Search);
        setIsLoading(false);
      }
    
      useEffect(() => {
        getMovies(keyword);
        }, []);

    return(
        <>
    <div className="container">
      <div className="row">
        <div className="searchbar">
          <div>Search results for <span className="bold">{keyword}</span></div>
          <div>
           <Slider value = {[range[0], range[1]]} onChange = {handleChanges} valueLabelDisplay="off"/>
          Filter by year {range[0]+1924} - {range[1]+1924}
          </div>
      <select id="order" onChange={(event) => filterMovies(event.target.value)} >
              <option value="" disabled selected>Sort by</option>
              <option value="new to old">Year, New to Old</option>
              <option value="old to new">Year, Old to New</option>
              <option value="a to z">Title, A to Z</option>
              <option value="z to a">Title, Z to A</option>
            </select>
          </div>
        <div className="movies">
          {isLoading
            ? new Array(10).fill(0).map((_, index) => (
                <div className="movie" key={index}>
                  <div className="movie-card">
                    <div className="movie-card__container" >
                        <img className="movie__img" src={Placeholder} alt="Placeholder" />
                        <h3 className="movie__skeleton">Title:<span className="blinking-text lighter">Loading...</span></h3>
                    </div>
                  </div>
                </div>
              ))
            : filteredMovies.map((movie) => (
                <div className="movie" key={movie.imdbID} onClick={() => navigate(`/${movie.imdbID}`)}>
                  <div className="movie-card">
                    <div className="movie-card__container">
                    <img className="movie__img" src={movie.Poster !== "N/A" ? `${movie.Poster}` : blankPlaceholder} alt="Poster" />
                      <h3 className="movie__title">{movie.Title}<span className="lighter"> ({movie.Year})</span></h3>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
    </>
   
    )
}

export default Movies