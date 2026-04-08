import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "../../components/movies/Filter";
import MovieCard from "../../components/movies/MovieCard";
import Button from "../../components/general/Button";
import "./dashboard.css";

const PAGE_SIZE = 10;

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("Latest");

  // 🔹 Debounce states
  const [title, setTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title);
      setPage(1);
      setHasMore(true);
    }, 500);
    return () => clearTimeout(handler);
  }, [title]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/titles/advancedsearch", {
          signal: controller.signal,
          params: {
            minYear,
            maxYear,
            genres: genres.join(","),
            title: debouncedTitle, // 🔥 use debounced value
            sort,
            page,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const newMovies = response.data.titles;

        if (page === 1) {
          setMovies(newMovies);
        } else {
          setMovies((prev) => [...prev, ...newMovies]);
        }

        if (newMovies.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [minYear, maxYear, genres, debouncedTitle, sort, page]);

  const handleFilterChange = (setter, value) => {
    setPage(1);
    setHasMore(true);
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
        setTitle={setTitle}
      />

      <div className="movie-grid">
        {movies.map((m) => (
          <MovieCard key={m.imdbId} movie={m} />
        ))}
      </div>

      {hasMore && movies.length > 0 && !isLoading && (
        <Button label="Load More.." onClick={handleLoadMore} />
      )}
    </div>
  );
}

export default HomePage;
