import { useState } from "react";
import axios from "axios";
import "./auth.css";
import Login from "./Login";
import Register from "./Register";
import Button from "../../components/general/Button";

function Authentication({ setIsLoggedIn, setUserUsername }) {
  const [_switch, setSwitch] = useState(true); // true = Sign In, false = Sign Up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (_switch) {
        response = await axios.post("/api/auth/login", {
          username,
          password,
        });
      } else {
        response = await axios.post("/api/auth/register", {
          username,
          password,
        });
      }

      const accessToken = response.data.accessToken;

      localStorage.setItem("accessToken", accessToken);
      setUserUsername(username);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <Button
          label="Sign In"
          onClick={() => setSwitch(true)}
          className={`auth-button ${_switch ? "active" : ""}`}
        />
        <Button
          label="Sign Up"
          onClick={() => setSwitch(false)}
          className={`auth-button ${!_switch ? "active" : ""}`}
        />
      </header>
      <form className="auth-form" onSubmit={handleSubmit}>
        {_switch ? (
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        ) : (
          <Register
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}
      </form>
    </div>
  );
}

export default Authentication
