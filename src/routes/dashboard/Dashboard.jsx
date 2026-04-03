import "./dashboard.css";
import Header from "../../components/navigation/Header";

function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <div className="dashboard-container">
      <Header
        userUsername={userUsername}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className="dashboard-content">
        Hello
      </div>
    </div>
  );
}

export default Dashboard;
