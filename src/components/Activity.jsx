import "./components.css";

function Activity({ username, movieTitle, date }) {
  return (
    <li className="activity-item">
      <p>
        <strong>{username}</strong> added{" "}
        <strong>{movieTitle}</strong> to watch later -{" "}
        <i>{date}</i>
      </p>
    </li>
  );
}

export default Activity;
