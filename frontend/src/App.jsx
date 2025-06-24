import React from "react";
import "./App.css";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      ochre: {
        main: "#E3D026",
        light: "#E9DB5D",
        dark: "#A29415",
        contrastText: "#242105",
      },
    },
  });

  const Papers = Array.from({ length: 9 }, (_, index) => (
    <Paper key={index} elevation={3} className="paper-item" />
  ));

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Header />
        <main className="main-content">
          <Box className="paper-container" >
            {Papers}
          </Box>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
