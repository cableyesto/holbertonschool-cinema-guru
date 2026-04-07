import Tag from "./Tag";
import SearchBar from "../general/SearchBar";
import Input from "../general/Input";
import SelectInput from "../general/SelectInput";

import "./movies.css";

const allGenres = [
  "Action",
  "Drama",
  "Comedy",
  "Biography",
  "Romance",
  "Thriller",
  "War",
  "History",
  "Sport",
  "Sci-Fi",
  "Documentary",
  "Crime",
  "Fantasy"
];

function Filter({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  sort,
  setSort,
  genres,
  setGenres,
  title,
  setTitle
}) {
  return (
    <div className="filter-container">
      <div className="filter-left">
        <SearchBar title={title} setTitle={setTitle} />
        <div className="year-filters">
          <Input
            label="Min Year"
            type="number"
            value={minYear}
            setValue={setMinYear}
          />
          <Input
            label="Max Year"
            type="number"
            value={maxYear}
            setValue={setMaxYear}
          />
          <SelectInput
            label="Sort"
            options={["Latest", "Oldest", "Highest Rated", "Lowest Rated"]}
            value={sort}
            setValue={setSort}
          /> 
        </div>
      </div>
      <div className="filter-right">
        <ul className="tags-list">
          {allGenres.map((g) => (
            <Tag
              key={g}
              genre={g}
              filter={true}
              genres={genres}
              setGenres={setGenres}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Filter;
