import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { autoLogin } from "./actions/auth";
import AppRoutes from "./routes/AppRoutes"; 

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(autoLogin());
  }, [dispatch])


  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </Router>
  );
}

export default App;
