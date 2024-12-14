import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store"
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from '@tanstack/react-query';

import App from "./App";
import "./components/GlobalStyles/Globalstyles";
import GlobalStyles from "./components/GlobalStyles/Globalstyles";
import queryClient from "./api/queryClient";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient} >
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  </QueryClientProvider>
);
