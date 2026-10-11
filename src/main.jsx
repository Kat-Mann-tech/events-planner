// starting point of the app

import { StrictMode } from "react";  // helps identify potential problems
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import EventProvider from "./contexts/EventContext.jsx";

createRoot(document.getElementById("root")).render(  //looks for the root container in index.html and renders the application there
  <StrictMode>
    <AuthProvider>
      <EventProvider>
        <App />  {/*app is nested so it can access EventProvider, AuthProvider and Strictmode- without wrapping context api doesn't work*/}
      </EventProvider>
    </AuthProvider>
  </StrictMode>,
);
