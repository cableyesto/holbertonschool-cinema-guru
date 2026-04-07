import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./navigation.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faStar, faClock } from "@fortawesome/free-solid-svg-icons";

import Activity from "../Activity";

function SideBar() {
  const [selected, setSelected] = useState("home");
  const [expanded, setExpanded] = useState(false); // sidebar expanded state
  const [activities, setActivities] = useState([]);

  const navigate = useNavigate();

  const setPage = (pageName) => {
    setSelected(pageName);

    if (pageName === "Home") navigate("/home");
    else if (pageName === "Favorites") navigate("/favorites");
    else if (pageName === "Watch Later") navigate("/watchlater");
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get("/api/activity", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;
        if (Array.isArray(data)) setActivities(data);
        else if (Array.isArray(data.activities)) setActivities(data.activities);
        else if (Array.isArray(data.data)) setActivities(data.data);
        else setActivities([]);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <nav
      className={`sidebar ${expanded ? "expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Navigation */}
      <ul className="sidebar-nav">
        <li onClick={() => setPage("Home")} className={selected === "Home" ? "active" : ""}>
          <FontAwesomeIcon icon={faFolder} />
          {expanded && <span className="text">Home</span>}
        </li>
        <li onClick={() => setPage("Favorites")} className={selected === "Favorites" ? "active" : ""}>
          <FontAwesomeIcon icon={faStar} />
          {expanded && <span className="text">Favorites</span>}
        </li>
        <li onClick={() => setPage("Watch Later")} className={selected === "Watch Later" ? "active" : ""}>
          <FontAwesomeIcon icon={faClock} />
          {expanded && <span className="text">Watch Later</span>}
        </li>
      </ul>

      {/* Activities */}
      {expanded && (
        <div className="sidebar-activities-section">
          <h3 className="activities-title">Latest Activities</h3>
          <ul className="sidebar-activities">
            {Array.isArray(activities) &&
              activities.slice(0, 10).map((activity, index) => (
                <Activity
                  key={index}
                  username={activity.user?.username}
                  movieTitle={activity.title?.title}
                  date={new Date(activity.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                />
              ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default SideBar;
