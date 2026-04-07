import { useState } from "react";
import "./movies.css";

function Tag({ genre, filter, genres, setGenres }) {
  const [selected, setSelected] = useState(false);

  const handleTag = () => {
    if (selected) {
      // Remove genre from the array
      setGenres(genres.filter((g) => g !== genre));
      setSelected(false);
    } else {
      // Add genre to the array
      setGenres([...genres, genre]);
      setSelected(true);
    }
  };

  return (
    <li
      className={`tag-item ${selected ? "selected" : ""} ${filter ? "filter-tag" : ""}`}
      onClick={handleTag}
    >
      {genre}
    </li>
  );
}

export default Tag;
