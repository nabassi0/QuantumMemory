import React from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Container from "@mui/material/Container";

function App() {
  return (
    <div className="app">
      <Header />
      <Container maxWidth="sm">
          <h1 className="text"> This is content</h1>    
      </Container>
    </div>
  );
}

export default App;
