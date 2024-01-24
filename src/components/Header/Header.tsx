import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../utils/redux/store";

function Header() {
  const gameTitle = useSelector(
    (state: RootState) => state.arrowGame.gameTitle
  );
  return (
    <header className="container">
      <div className="nav-container">
        <li className="nav-item">
          <Link to="/">{gameTitle}</Link>
        </li>
      </div>
    </header>
  );
}

export default Header;
