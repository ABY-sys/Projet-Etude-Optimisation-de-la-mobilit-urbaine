import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../index.css";


const Connexion = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Connecté :", user.uid);
  
      navigate("/");
    } catch (error) {
      console.error("Erreur à la connexion :", error.message);
      setMessage("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <div className="form-container">
          <h2 className="form-title text-center">Se connecter</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-danger mt-3">
                Connexion
              </button>
            </div>
          </form>
          {message && <p className="message">{message}</p>}
          <p className="mt-3">
            Pas encore de compte ? <Link to="/Inscription">Inscrivez-vous</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Connexion;
