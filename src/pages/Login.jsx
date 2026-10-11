import { useState, useContext } from "react";  //state stores what the user enters, context to use AuthContext
import { useNavigate, Link } from "react-router-dom";  // to redirect after
import { AuthContext } from "../contexts/AuthContext";
import "../CSS/Login.css";

function Login() {
  const { login } = useContext(AuthContext);  // does the authentication check
  const navigate = useNavigate();

  const [username, setUsername] = useState("");  // creates state for username and password- initially blank as user needs to input
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();  // stops the browser from refreshing

    const success = login(username, password);

    if (success) {
      navigate("/dashboard");  // if it's a success go to the dashboard
    } else {
      alert("Invalid username or password");  // if not show this message
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}  // updates the username state when the user types
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>  // directs to register page
      </p>
    </div>
  );
}

export default Login;
