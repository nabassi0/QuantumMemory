import "../styles/components/Header.scss";
import Drawer from "../components/Drawer";
import Logo from "../assets/images/LogoQuantum.svg"

export default function Header() {
  return (
    <div className="header">
      <div className="header-container">
        <img src={Logo} alt="" />
          <Drawer />
      </div>
    </div>
  );
}
