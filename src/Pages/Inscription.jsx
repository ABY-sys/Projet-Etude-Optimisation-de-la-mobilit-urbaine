import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
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
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(""); // Réinitialiser le message avant chaque soumission
    try {
      // Créer l'utilisateur avec Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Utilisateur créé :", user.uid);
      const idToken = await user.getIdToken();
      const response = await fetch('https://registeruser-vqusi6wjfa-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: nom,
          email: email,
          uid: user.uid
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
      setMessage("Utilisateur créé avec succès, vous allez être redirigé vers la page de connexion");
      setTimeout(() => {
        navigate("/connexion");
      }, 3000);
    } catch (error) {
      console.error("Erreur à l'inscription :", error.message);
      setMessage("Addresse email déjà utilisée");
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
