import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "../../components/movies/Filter";
import MovieCard from "../../components/movies/MovieCard";
import Button from "../../components/general/Button";
import "./dashboard.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("Latest");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  // 1. Move the API logic into the Effect
  useEffect(() => {
    // Create an AbortController to cancel old requests if filters change quickly
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/titles/advancedsearch", {
          signal: controller.signal,
          params: {
            minYear,
            maxYear,
            genres: genres.join(","),
            title,
            sort,
            page,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (page === 1) {
          setMovies(response.data.titles);
        } else {
          setMovies((prev) => [...prev, ...response.data.titles]);
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();

    // Cleanup: cancel request if component unmounts or deps change
    return () => controller.abort();
    
    // 2. Include 'page' in the dependency array
  }, [minYear, maxYear, genres, title, sort, page]);

  // 3. Simplified Handlers
  // When filters change, we just reset page to 1. 
  // The useEffect detects this change and triggers the fetch automatically.
  const handleFilterChange = (setter, value) => {
    setPage(1);
    setter(value);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="homepage-container">
      <Filter
        minYear={minYear}
        setMinYear={(val) => handleFilterChange(setMinYear, val)}
        maxYear={maxYear}
        setMaxYear={(val) => handleFilterChange(setMaxYear, val)}
        sort={sort}
        setSort={(val) => handleFilterChange(setSort, val)}
        genres={genres}
        setGenres={(val) => handleFilterChange(setGenres, val)}
        title={title}
        setTitle={(val) => handleFilterChange(setTitle, val)}
      />

      <div className="movie-grid">
        {movies.map((m) => (
          <MovieCard key={m.imdbId} movie={m} />
        ))}
      </div>

      {movies.length > 0 && (
        <Button label="Load More.." onClick={handleLoadMore} />
      )}
    </div>
  );
}

export default HomePage;
