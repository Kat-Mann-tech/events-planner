import { useState, useContext } from "react";  // state stores user input, context uses AuthContext
import { useNavigate } from "react-router-dom";  // to redirect after someone registers
import { AuthContext } from "../contexts/AuthContext";
import "../CSS/Register.css";

function Register() {
  const navigate = useNavigate();  // to redirect after registering
  const { register } = useContext(AuthContext);  // allows the page to save the new user

  const [formData, setFormData] = useState({  // creates the single state object containing the following
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,   // copies the current form values- without this, other fields would be deleted every time the user types
      [event.target.name]: event.target.value,  // finds the property whose name matches the input and updates
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();  // stops from refreshing the page

    // checks to see that all forms fields have been completed
    if (
      !formData.name ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      alert("Please complete all fields");
      return;   // stops the function running any further- without, the registration would keep going even if the input's invalid
    }

    // checks to see that the email is an actual email address using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    register(formData);  //passes the information into AuthContext

    alert("Registration successful");

    navigate("/");  // navigates back to the login page
  };

  return (
    <div className="register-container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
