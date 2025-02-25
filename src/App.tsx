import React from "react";
import './assets/css/App.css'
import { Provider } from "react-redux";
import AppRouter from "./Router/Router";
import { store } from "./Store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
