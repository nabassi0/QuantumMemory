import "../styles/components/Header.scss";
import Drawer from "../components/Drawer";
import Logo from "../assets/images/oui.svg";

export default function Header({ gameState, onStartGame, onGenerateSequence }) {
  return (
    <div className="header">
      <div className="header-container">
        <img src={Logo} alt="" className="background-image" />
        <Drawer 
          gameState={gameState}
          onStartGame={onStartGame}
          onGenerateSequence={onGenerateSequence}
        />
      </div>
    </div>
  );
}
