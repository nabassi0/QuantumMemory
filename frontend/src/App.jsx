import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  // État du jeu de mémoire quantique
  const [gameState, setGameState] = useState({
    level: 1,                    // Niveau actuel (1-5)
    sublevel: 1,                 // Sous-niveau actuel (1-5)
    sequence: [],                // Séquence quantique à reproduire [2, 7, 4]
    playerSequence: [],          // Séquence du joueur [2, 7, ...]
    isShowingSequence: false,    // Mode "affichage" ou "attente joueur"
    currentStep: 0,              // Étape actuelle dans la séquence
    score: 0,                    // Score du joueur
    gameStarted: false,          // Jeu lancé ou non
    isWaitingForPlayer: false,   // Attend que le joueur clique
    revealedCards: []            // Cartes actuellement révélées
  });

  // Fonction pour démarrer une nouvelle partie
  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      level: 1,
      sublevel: 1,
      sequence: [],
      playerSequence: [],
      score: 0,
      gameStarted: true,
      isShowingSequence: false,
      currentStep: 0,
      isWaitingForPlayer: false,
      revealedCards: []
    }));
  };
  // Fonction pour générer une nouvelle séquence (appel API)
  const generateNewSequence = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/generate-sequence?level=${gameState.level}&sublevel=${gameState.sublevel}`
      );
      const data = await response.json();
      
      setGameState(prev => ({
        ...prev,
        sequence: data.sequence,
        playerSequence: [],
        currentStep: 0,
        isShowingSequence: true,
        revealedCards: []
      }));
      
      // Démarre l'affichage de la séquence
      showSequenceToPlayer(data.sequence);
    } catch (error) {
      console.error("Erreur lors de la génération de séquence:", error);
    }
  };
  // Fonction pour afficher la séquence au joueur
  const showSequenceToPlayer = (sequence) => {
    console.log("Séquence à afficher:", sequence);
    
    // Affiche chaque carte de la séquence avec un délai
    sequence.forEach((cardIndex, step) => {
      setTimeout(() => {
        // Révèle la carte
        setGameState(prev => ({
          ...prev,
          revealedCards: [...prev.revealedCards, cardIndex]
        }));
        
        // Cache la carte après 1 seconde
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            revealedCards: prev.revealedCards.filter(card => card !== cardIndex)
          }));
          
          // Si c'est la dernière carte, passe en mode joueur
          if (step === sequence.length - 1) {
            setTimeout(() => {
              setGameState(prev => ({
                ...prev,
                isShowingSequence: false,
                isWaitingForPlayer: true
              }));
            }, 500);
          }
        }, 1000);
      }, step * 1500); // Délai entre chaque carte
    });
  };

  // Fonction pour gérer les clics du joueur sur les cartes
  const handleCardClick = (cardIndex) => {
    if (!gameState.isWaitingForPlayer) return;
    
    // Logique de validation sera ajoutée ici
    console.log("Carte cliquée:", cardIndex);
  };

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
  // Génération des cartes avec gestion des clics et animations
  const Papers = Array.from({ length: 9 }, (_, index) => (
    <Paper 
      key={index} 
      elevation={3} 
      className={`paper-item ${gameState.revealedCards.includes(index) ? 'revealed' : ''}`}
      onClick={() => handleCardClick(index)}
      data-index={index}
      style={{ 
        cursor: gameState.isWaitingForPlayer ? 'pointer' : 'default'
      }}
    />
  ));

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Header 
          gameState={gameState}
          onStartGame={startGame}
          onGenerateSequence={generateNewSequence}
        />
        <main className="main-content">
          <Box className="paper-container">
            {Papers}
          </Box>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
