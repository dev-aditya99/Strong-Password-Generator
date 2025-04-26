import { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="main p-5 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
