import React from "react";
import "./App.css";
import Header from "./components/Header";
import Container from "@mui/material/Container";

function App() {
  return (
    <div>
      <Header />
      <Container maxWidth="sm">
        <div>
          <h1> This is content</h1>
        </div>
      </Container>
    </div>
  );
}

export default App;
