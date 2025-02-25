import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/App.css";
import ChatPage from "./Pages/ChatPage";
import { NavHome } from "./Components/NavHome";

const App: React.FC = () => {
  return (
    <Router>
      <NavHome />
      <Routes>
        <Route path="/chatPage" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default App;
