import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";
import "./movies.css";
import axios from "axios";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const [favRes, watchRes] = await Promise.all([
          axios.get("/api/titles/favorite/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/titles/watchlater/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const favIds = favRes.data.map((m) => m.imdbId);
        const watchIds = watchRes.data.map((m) => m.imdbId);

        setIsFavorite(favIds.includes(movie.imdbId));
        setIsWatchLater(watchIds.includes(movie.imdbId));
      } catch (error) {
        console.error("Error fetching user lists:", error);
      }
    };

    fetchUserLists();
  }, [movie]);

  const handleClick = async (type) => {
    try {
      const token = localStorage.getItem("accessToken");
      const url = `/api/titles/${type}/${movie.imdbId}`;

      if (type === "favorite") {
        if (isFavorite) {
          await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
          setIsFavorite(false);
        } else {
          await axios.post(url, null, { headers: { Authorization: `Bearer ${token}` } });
          setIsFavorite(true);
        }
      } else if (type === "watchlater") {
        if (isWatchLater) {
          await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
          setIsWatchLater(false);
        } else {
          await axios.post(url, null, { headers: { Authorization: `Bearer ${token}` } });
          setIsWatchLater(true);
        }
      }
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  const shortenSynopsis = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "..";
  };

  const imageUrl = movie.imageurls && movie.imageurls.length > 0
    ? movie.imageurls[0]
    : null;

  return (
    <li className="movie-card">
      <div className="movie-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={movie.title} className="movie-image" />
        ) : (
          <div className="movie-image-placeholder" />
        )}
        <div className="movie-icons">
          <FontAwesomeIcon
            icon={faHeart}
            className={`icon favorite ${isFavorite ? "active" : ""}`}
            onClick={() => handleClick("favorite")}
          />
          <FontAwesomeIcon
            icon={faClock}
            className={`icon watchlater ${isWatchLater ? "active" : ""}`}
            onClick={() => handleClick("watchlater")}
          />
        </div>
        <div className="movie-title-bar">
          <h4 className="movie-title">{movie.title}</h4>
        </div>
      </div>
      <p className="movie-synopsis">{shortenSynopsis(movie.synopsis)}</p>
      <ul className="movie-genres">
        {movie.genres.map((g) => (
          <li key={g} className="genre-tag selected">{g}</li>
        ))}
      </ul>
    </li>
  );
}

export default MovieCard;
