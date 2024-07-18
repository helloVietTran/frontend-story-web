import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import ReactDOM from "react-dom/client";
import "./components/GlobalStyles/index";
import App from "./App";
import GlobalStyles from "./components/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalStyles>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalStyles>
);
