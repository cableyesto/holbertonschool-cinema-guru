import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";
import "./dashboard.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./HomePage";
import Favorites from "./Favorites";
import WatchLater from "./WatchLater";

function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <BrowserRouter>
      <div className="dashboard-container">
        <Header
          userUsername={userUsername}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div className="dashboard-body">
          <SideBar />
          <div className="dashboard-content">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watchlater" element={<WatchLater />} />
              {/* Redirect all unknown routes */}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Dashboard;
