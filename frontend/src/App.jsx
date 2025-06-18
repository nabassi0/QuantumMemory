import React from "react";
import "./App.css";
import Header from "./components/Header";
import Container from "@mui/material/Container";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Container maxWidth="sm">
          <div className="content">
            <h1 className="text"> This is content</h1>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default App;
