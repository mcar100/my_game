import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="container">
      <div className="nav-container">
        <li className="nav-item">
          <Link to="/">My Game</Link>
        </li>
      </div>
    </header>
  );
}

export default Header;
