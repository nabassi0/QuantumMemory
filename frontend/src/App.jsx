import React from "react";
import "./App.css";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Box className="paper-container">
          <Paper elevation={0} />
          <Paper />
          <Paper elevation={3} />
        </Box>
      </main>
    </div>
  );
}

export default App;
