import "./navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Header({ userUsername, setIsLoggedIn }) {
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("accessToken");

    // Update state
    setIsLoggedIn(false);
  };

  return (
    <nav className="nav-header">
      <div>Cinema Guru</div>
      <img
        src="https://picsum.photos/40/40"
        alt="User avatar"
        className="nav-avatar"
      />
      <p className="nav-welcome">
        Welcome, {userUsername}
      </p>
      <span className="nav-logout" onClick={logout}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
      </span>
    </nav>
  );
}

export default Header;
