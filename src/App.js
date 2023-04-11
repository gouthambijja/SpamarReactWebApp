import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Outlet } from "react-router-dom";
import "./css/SpamarApp.css";
import "./css/tooltip.css";

function App() {
  return (
    <div className="authenticateContainer">
      <Outlet />
    </div>
  );
}

export default App;
