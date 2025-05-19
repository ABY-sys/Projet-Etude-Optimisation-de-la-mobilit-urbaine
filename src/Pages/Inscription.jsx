import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../index.css";

const Inscription = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // État pour le message de succès ou d'erreur

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(""); // Réinitialiser le message avant chaque soumission
    try {
      // Créer l'utilisateur avec Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Utilisateur créé :", user.uid);
  
      // Envoyer les données à votre backend
      const response = await fetch('https://us-central1-projet-etude-sdv.cloudfunctions.net/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: nom,
          email: email,
          password: password
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Inscription réussie
        setMessage("Utilisateur créé avec succès : " + data.userId);
        navigate("/"); // Rediriger vers la page d'accueil ou une autre page
      } else {
        // Gérer les erreurs du backend
        setMessage("Erreur : " + data.error);
      }
    } catch (error) {
      console.error("Erreur à l'inscription :", error.message);
      setMessage("Erreur : " + error.message);
    }
  };  

  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <div className="form-container">
          <h2 className="form-title">Créer un compte</h2>
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
            <button type="submit" className="btn btn-danger mt-3">
              S'inscrire
            </button>
          </form>
          {message && <p className="message">{message}</p>} {/* Afficher le message de succès ou d'erreur */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inscription;
