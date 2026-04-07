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

  // Function to load movies from the API
  const loadMovies = async (pageToLoad = 1) => {
    try {
      const response = await axios.get("/api/titles/advancedsearch", {
        params: {
          minYear,
          maxYear,
          genre: genres.join(","), // Convert array to comma-separated string
          title,
          sort,
          page: pageToLoad,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // If loading first page, replace movies, else append
      if (pageToLoad === 1) {
        setMovies(response.data.titles);
      } else {
        setMovies((prev) => [...prev, ...response.data.titles]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Load movies on mount and whenever filters/sorting change
  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [minYear, maxYear, genres, sort, title]);

  // Handler for Load More button
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  return (
    <div className="homepage-container">
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
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
