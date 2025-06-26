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
    level: 1, // Niveau actuel (1-5)
    sublevel: 1, // Sous-niveau actuel (1-5)
    sequence: [], // Séquence quantique à reproduire [2, 7, 4]
    playerSequence: [], // Séquence du joueur [2, 7, ...]
    isShowingSequence: false, // Mode "affichage" ou "attente joueur"
    currentStep: 0, // Étape actuelle dans la séquence
    score: 0, // Score du joueur
    gameStarted: false, // Jeu lancé ou non
    isWaitingForPlayer: false, // Attend que le joueur clique
    revealedCards: [], // Cartes actuellement révélées
    lives: 10, // Nombre de vies restantes
    maxLives: 10, // Nombre maximum de vies
  }); // Fonction pour démarrer une nouvelle partie
  const startGame = () => {
    setGameState((prev) => ({
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
      revealedCards: [],
      lives: 10, // Reset des vies
      maxLives: 10,
    }));

    // va générer automatiquement la première séquence
    setTimeout(() => {
      generateNewSequence();
    }, 500);
  }; // la fonction pour générer une nv sequence via appel d'api
  const generateNewSequence = async (
    level = gameState.level,
    sublevel = gameState.sublevel
  ) => {
    try {
      console.log(
        `Génération séquence pour Niveau ${level}, Sous-niveau ${sublevel}`
      );
      const response = await fetch(
        `http://127.0.0.1:5000/api/generate-sequence?level=${level}&sublevel=${sublevel}`
      );
      const data = await response.json();

      setGameState((prev) => ({
        ...prev,
        sequence: data.sequence,
        playerSequence: [],
        currentStep: 0,
        isShowingSequence: true,
        revealedCards: [],
      }));

      // sémarre l'affichage de la séquence
      showSequenceToPlayer(data.sequence);
    } catch (error) {
      console.error("Erreur lors de la génération de séquence:", error);
    }
  };
  // la fonction pour afficher la séquence au joueur
  const showSequenceToPlayer = (sequence) => {
    console.log("Séquence à afficher:", sequence);

    // va affiche chaque carte de la séquence avec un délai
    sequence.forEach((cardIndex, step) => {
      setTimeout(() => {
        // Révèle la carte
        setGameState((prev) => ({
          ...prev,
          revealedCards: [...prev.revealedCards, cardIndex],
        }));

        // cache la carte après 1 seconde
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            revealedCards: prev.revealedCards.filter(
              (card) => card !== cardIndex
            ),
          }));

          // si c'est la dernière carte, passe en mode joueur
          if (step === sequence.length - 1) {
            setTimeout(() => {
              setGameState((prev) => ({
                ...prev,
                isShowingSequence: false,
                isWaitingForPlayer: true,
              }));
            }, 500);
          }
        }, 1000);
      }, step * 1500); // Délai entre chaque carte
    });
  };
  // celle la, fonction pour gérer les clics du joueur sur les cartes
  const handleCardClick = (cardIndex) => {
    if (!gameState.isWaitingForPlayer) return;

    console.log("Carte cliquée:", cardIndex);
    console.log("Séquence attendue:", gameState.sequence);
    console.log("Séquence joueur:", [...gameState.playerSequence, cardIndex]);

    // va ajoute la carte cliquée à la séquence du joueur
    const newPlayerSequence = [...gameState.playerSequence, cardIndex];
    const currentStep = newPlayerSequence.length - 1;

    // on vérifie si le clic est correct
    const isCorrect = gameState.sequence[currentStep] === cardIndex;

    if (isCorrect) {
      // on va révèler temporairement la carte cliquée (feedback positif)
      setGameState((prev) => ({
        ...prev,
        playerSequence: newPlayerSequence,
        revealedCards: [cardIndex],
      }));

      // Cache la carte après 500ms
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          revealedCards: [],
        }));
      }, 500);

      // Vérifie si la séquence est complète
      if (newPlayerSequence.length === gameState.sequence.length) {
        // Séquence réussie !
        setTimeout(() => {
          handleLevelComplete();
        }, 700);
      }
    } else {
      // mauvaise carte - Perd une vie
      const newLives = gameState.lives - 1;
      console.log(
        `Mauvaise carte ! La bonne était ${gameState.sequence[currentStep]}. Vies restantes: ${newLives}`
      );

      if (newLives <= 0) {
        // game Over - Plus de vies
        console.log("Game Over ! Plus de vies restantes.");
        resetGame();
      } else {
        // on continue avec une vie en moins
        setGameState((prev) => ({
          ...prev,
          lives: newLives,
          playerSequence: [],
          revealedCards: [],
          isWaitingForPlayer: false,
          isShowingSequence: false,
        }));

        // relance la même séquence après une courte pause
        setTimeout(() => {
          showSequenceToPlayer(gameState.sequence);
        }, 1500);
      }
    }
  };
  // fonction appelée quand un sous-niveau est réussi
  const handleLevelComplete = () => {
    const newScore =
      gameState.score + gameState.level * gameState.sublevel * 10;

    if (gameState.sublevel < 5) {
      // Passe au sous-niveau suivant
      setGameState((prev) => ({
        ...prev,
        sublevel: prev.sublevel + 1,
        score: newScore,
        sequence: [],
        playerSequence: [],
        isWaitingForPlayer: false,
        isShowingSequence: false,
      }));
      console.log(
        `Sous-niveau ${gameState.sublevel} réussi ! Score: ${newScore}`
      );

      // Génère automatiquement la séquence suivante avec les nouveaux paramètres
      setTimeout(() => {
        generateNewSequence(gameState.level, gameState.sublevel + 1);
      }, 1000);
    } else {
      // Sous-niveau 5 terminé, passe au niveau suivant
      if (gameState.level < 5) {
        setGameState((prev) => ({
          ...prev,
          level: prev.level + 1,
          sublevel: 1, // ✅ Reset au sous-niveau 1 pour le nouveau niveau
          score: newScore,
          sequence: [],
          playerSequence: [],
          isWaitingForPlayer: false,
          isShowingSequence: false,
        }));
        console.log(
          `🎉 Niveau ${gameState.level} terminé ! Passage au niveau ${
            gameState.level + 1
          }. Nouvelle grille ${getGridDimensions(
            gameState.level + 1
          )}x${getGridDimensions(
            gameState.level + 1
          )}. Retour au sous-niveau 1. Score: ${newScore}`
        );

        // Génère automatiquement la séquence du nouveau niveau avec sous-niveau 1
        setTimeout(() => {
          generateNewSequence(gameState.level + 1, 1);
        }, 2000);
      } else {
        // Jeu terminé !
        console.log(
          `🎉 FÉLICITATIONS ! Jeu terminé ! Score final: ${newScore}`
        );
        resetGame();
      }
    }
  };
  // fonction pour reset le jeu
  const resetGame = () => {
    setGameState({
      level: 1,
      sublevel: 1,
      sequence: [],
      playerSequence: [],
      isShowingSequence: false,
      currentStep: 0,
      score: 0,
      gameStarted: false,
      isWaitingForPlayer: false,
      revealedCards: [],
      lives: 10,
      maxLives: 10,
    });
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
  }); // Génération des cartes avec grille dynamique selon le niveau
  const getGridSize = (level) => {
    const gridSizes = { 1: 9, 2: 16, 3: 25, 4: 36, 5: 49 };
    return gridSizes[level] || 9;
  };

  const getGridDimensions = (level) => {
    const dimensions = { 1: 3, 2: 4, 3: 5, 4: 6, 5: 7 };
    return dimensions[level] || 3;
  };

  const currentGridSize = getGridSize(gameState.level);
  const currentGridDimension = getGridDimensions(gameState.level);

  console.log(
    `Niveau actuel: ${gameState.level}, Grille: ${currentGridDimension}x${currentGridDimension} (${currentGridSize} cartes)`
  );

  const Papers = Array.from({ length: currentGridSize }, (_, index) => (
    <Paper
      key={`${gameState.level}-${index}`} // Key unique pour forcer le re-render
      elevation={3}
      className={`paper-item ${
        gameState.revealedCards.includes(index) ? "revealed" : ""
      }`}
      onClick={() => handleCardClick(index)}
      data-index={index}
      style={{
        cursor: gameState.isWaitingForPlayer ? "pointer" : "default",
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
        />{" "}
        <main className="main-content">
          <Box
            className="paper-container"
            style={{
              gridTemplateColumns: `repeat(${currentGridDimension}, minmax(150px, 1fr))`,
              gridTemplateRows: `repeat(${currentGridDimension}, minmax(150px, 1fr))`,
            }}
          >
            {Papers}
          </Box>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
