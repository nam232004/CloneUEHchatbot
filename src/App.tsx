import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/App.css";
import ChatPage from "./Pages/ChatPage";
import { NavHome } from "./Components/NavHome";
import { Provider } from "react-redux";
import { store } from "./Store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavHome />
        <Routes>
          <Route path="/chatPage" element={<ChatPage />} />
        </Routes>
      </Router>
    </Provider>

  );
};

export default App;
