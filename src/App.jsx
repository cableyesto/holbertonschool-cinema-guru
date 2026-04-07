import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Dashboard from "./routes/dashboard/Dashboard";
import Authentication from "./routes/auth/Authentication";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) return;

    const authenticateUser = async () => {
      try {
        const response = await axios.post(
          "/api/auth/login",
          {}, // Empty body for POST
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setIsLoggedIn(true);
        setUserUsername(response.data.username || "");
      } catch (error) {
        setIsLoggedIn(false);
        setUserUsername("");
      }
    }; 

    authenticateUser();
  }, []);

  return isLoggedIn ? (
    <Dashboard
      userUsername={userUsername}
      setIsLoggedIn={setIsLoggedIn}
    />
  ) : (
    <Authentication
      setIsLoggedIn={setIsLoggedIn}
      setUserUsername={setUserUsername}
    />
  );
}

export default App
