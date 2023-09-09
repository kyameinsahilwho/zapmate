import logo from "./logo.svg";
import "./App.css";
import UIkit from "uikit";
import "../src/assets/css/style.css";
import "../src/assets/css/tailwind.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthContext from "./context/Auth";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div id="wrapper">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
      {console.log(user)}
      {user &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" && <Sidebar />}
    </div>
  );
}

export default App;
