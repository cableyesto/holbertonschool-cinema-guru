import { useState } from "react";
import "./auth.css";
import Login from "./Login";
import Register from "./Register";
import Button from "../../components/general/Button";

function Authentication({ setIsLoggedIn, setUserUsername }) {
  const [_switch, setSwitch] = useState(true); // true = Sign In, false = Sign Up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    </div>
  );
}

export default Authentication
