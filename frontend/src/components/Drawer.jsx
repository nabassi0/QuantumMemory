import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import "../styles/components/Drawer.scss";

export default function TemporaryDrawer({ gameState, onStartGame, onGenerateSequence }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={onStartGame}>
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <ListItemText primary="Nouvelle Partie" />
          </ListItemButton>
        </ListItem>
        
        {gameState.gameStarted && (
          <ListItem disablePadding>
            <ListItemButton onClick={onGenerateSequence}>
              <ListItemIcon>
                <ShuffleIcon />
              </ListItemIcon>
              <ListItemText primary="Générer Séquence" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      
      <Divider />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={`Score: ${gameState.score}`} />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={`Niveau: ${gameState.level}`} />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={`Sous-niveau: ${gameState.sublevel}`} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="drawer-container">
      {/* Boutons avec vraies valeurs */}
      <Button variant="contained" disabled sx={{ borderRadius: "15px"}}>
        Score: {gameState.score}
      </Button>
      <Button variant="contained" disabled sx={{ borderRadius: "15px"}}>
        Niveau: {gameState.level}
      </Button>
      <Button variant="contained" disabled sx={{ borderRadius: "15px"}}>
        Sous-niveau: {gameState.sublevel}
      </Button>
      <Button onClick={toggleDrawer(true)} variant="outlined" sx={{ color: "white", borderRadius: "15px", borderColor: "white", borderWidth: "1.5px" }}>
        <MenuIcon />
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
