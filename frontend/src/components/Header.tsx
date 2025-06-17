import "../styles/components/Header.scss";
import Button from "@mui/material/Button";

export default function Header() {
  return (
    <div className="header">
      <div className="header-container">
        <h1>This is the header.</h1>
      <Button variant="contained">Nouvelle partie</Button>
      </div>
      
    </div>
  );
}
