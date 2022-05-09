import SideBar from "./components/sideBar/SideBar";
import TopBar from "./components/topBar/TopBar";
import "./app.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./pages/user/User";

function App() {
  return (
    <Router>
      <TopBar />
      <div className="container">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
