// imports components needed throughout the app
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Help from "./pages/Help";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>  {/*wraps the app and enables React*/}
      <Header />  {/*displays the header throughout the app*/}
      <Routes>  {/*React Router checks the URL and decides which component to display*/}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />   {/*id gets passed through the URL so the right event can be edited/ deleted */}
        <Route path="/help" element={<Help />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
