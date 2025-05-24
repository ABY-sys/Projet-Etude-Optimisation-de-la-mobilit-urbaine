import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; 
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../index.css";

const Inscription = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Utilise Firestore pour enregistrer les informations de l'utilisateur
      await setDoc(doc(db, "users", user.uid), {
        full_name: nom,
        email: email,
        uid: user.uid,
      });

      setMessage("Utilisateur créé avec succès ! Redirection...");
      setTimeout(() => {
        navigate("/Connexion");
      }, 1000);
    } catch (error) {
      console.error("Erreur à l'inscription :", error.message);
      setMessage("Erreur : " + error.message); // Affiche l'erreur à l'utilisateur
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <div className="form-container">
          <h2 className="form-title text-center">Créer un compte</h2>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                className="form-control"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
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
            {message && <p className="message text-center">{message}</p>}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-danger mt-3">
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inscription;
