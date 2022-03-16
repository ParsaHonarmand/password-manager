import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Vault from "./Vault";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TopBar from "./components/TopBar";
import Generator from "./Generator";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <Router>
    <TopBar /> {/* Always render the Top Bar */}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/vault" element={<Vault />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/generator" element={<Generator />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
