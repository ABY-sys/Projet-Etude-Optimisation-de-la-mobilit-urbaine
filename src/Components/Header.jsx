import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import styles from './Header.module.css';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setDisplayName(userDoc.data().full_name);
        } else {
          setDisplayName(user.email);
        }
      } else {
        setDisplayName("");
      }
    });

    return unsubscribe;
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/Connexion");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  // Determine if we are on the Connexion or Inscription page
  const onAuthPage = location.pathname === "/Connexion" || location.pathname === "/Inscription";

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
              <Link className={styles.navLink} to="/Itineraires">Itinéraires</Link>
            </li>
            <li className="nav-item">
              <Link className={styles.navLink} to="/Traffic">Trafic</Link>
            </li>
            <li className="nav-item">
              <Link className={styles.navLink} to="/test">test</Link>
            </li>
          </ul>
          {!onAuthPage && (
            currentUser ? (
              <div className="dropdown">
                <button
                  className="btn btn-danger dropdown-toggle"
                  type="button"
                  style={{ marginRight: '40px' }}
                  onClick={toggleDropdown}
                >
                  {displayName}
                </button>
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                  <li><button className="dropdown-item" onClick={handleSignOut}>Déconnexion</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/Connexion" className="btn btn-danger" style={{ marginRight: '30px' }}>Se connecter</Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
