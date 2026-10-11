// manages who's logged in

import { createContext, useState } from "react";  //creates the context object, useState stores the current user

export const AuthContext = createContext();  // other components access this by using useContext(AuthContext)


// children prop- everything inside AuthProvider gets access to AuthContext
function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null, // returns either the user or null if they're not logged in- keeps them logged in after refreshing the page
  );

  const register = (newUser) => {  //adds the new user to 'users'
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(newUser);  // adds the newly registered user into the array

    localStorage.setItem("users", JSON.stringify(users));  // stores in local storage as JSON
  };

  const login = (username, password) => {  // runs when user clicks login- checks the existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];  

    const foundUser = users.find(   // adds to found user if the username and password match
      (user) => user.username === username && user.password === password,
    );

    if (foundUser) {
      setUser(foundUser);  // updates the react state
      localStorage.setItem("currentUser", JSON.stringify(foundUser));  // stores the logged in user
      return true;
    }

    return false;  // if user isn't found- displays the error message
  };

  const logout = () => {
    setUser(null);   // removes the logged in user
    localStorage.removeItem("currentUser");   // removes from state
  };


  // creates the provider making all 4 available to any component using AuthContext
  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
