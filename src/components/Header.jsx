// import components
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../CSS/Header.css";
import { useNavigate } from "react-router-dom";

// creates the function header to be used at the top of each page
function Header() {
  const { user, logout } = useContext(AuthContext);  //uses authcontext to know if someone's logged in
  const navigate = useNavigate();  //uses navigation hook
  const handleLogout = () => {
    logout();
    navigate("/");  // redirects to the home page when they've logged out
  };

  return (
    <header className="header">  {/* uses custom styling header*/}
      <h2>Event Planner</h2>

      <nav>   {/* contains all the nav links */}
        <NavLink to="/dashboard">Dashboard</NavLink>

        {" | "}  {/* creates the line in between nav items */}

        <NavLink to="/add-event">Add Event</NavLink>

        {" | "}

        <NavLink to="/help">Help</NavLink>

        {user && (
          <>
            {" | "}

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
