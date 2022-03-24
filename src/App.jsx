import { useEffect, useState, useRef } from "react";
import SearchIcon from "./components/search.svg";
import "./App.css";
//API_KEY = 9bccaec7

const API_URL = "http://www.omdbapi.com?apikey=9bccaec7";

function App() {
  let search = useRef(null);

  const [movie1, setMovie1] = useState([]);

  const [searchMovie, setSearchMovie] = useState("spiderman");

  const handleSearch = (movieTitle) => {
    setSearchMovie(movieTitle);
    console.log(movieTitle);
    console.log(searchMovie);
  };
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.search === false) {
      alert("you movie is not found plz check spelling");
    } else {
      setMovie1(data.Search);
    }
  };

  useEffect(() => {
    searchMovies(searchMovie);
  }, [searchMovie]);
  console.log(movie1);
  return (
    <div className="app">
      <h1>MOVIES LAND HERE</h1>
      <div className="search">
        <input placeholder="search for movies" ref={search} />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            handleSearch(search.current.value);
          }}
        />
      </div>
      <div className="container">
        {movie1.map((d, ind) => {
          return (
            <div key={ind} className="movie">
              <div>
                <p>{d.Year} </p>
              </div>
              <div>
                <img
                  src={
                    d.Poster !== "N/A"
                      ? d.Poster
                      : "https://via.placeholder.com/400"
                  }
                  alt={d.Poster}
                />
              </div>
              <div>
                <span>{d.Type}</span>
                <h3>{d.Title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
