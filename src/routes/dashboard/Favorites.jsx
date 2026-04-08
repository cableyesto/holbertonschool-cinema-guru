import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../../components/movies/MovieCard";
import "./dashboard.css";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/api/titles/favorite/", {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setMovies(response.data); // set movies to the array returned
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching favorite movies:", error);
      }
    };

    fetchFavorites();

    return () => controller.abort();
  }, []);

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">MOVIES YOU LIKE</h1>
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((m) => <MovieCard key={m.imdbId} movie={m} />)
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
