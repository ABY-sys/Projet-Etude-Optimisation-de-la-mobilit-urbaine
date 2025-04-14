import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="Images/logo.png" alt="Logo" className="navbar-logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/Itineraires">Itinéraire</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Bilan_carbone">Bilan Carbone</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/test">test</Link>
            </li>
          </ul>
          <Link to="/signup" className="btn btn-danger me-2">Créer un compte</Link>
          <Link to="/login" className="btn btn-danger">Se connecter</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
