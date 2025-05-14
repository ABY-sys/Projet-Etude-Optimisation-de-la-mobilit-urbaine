import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Trafic from "./pages/Trafic";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      {/* Barre de navigation */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <img src="/logo.png" alt="Logo" className="h-10" />
        <div className="flex items-center space-x-6">
          <nav className="flex gap-6 font-semibold">
            <Link to="/">Itinéraires</Link>
            <Link to="/trafic">Traffic</Link>
            <Link to="/bilan">Bilan carbone</Link>
          </nav>
          <Link to="/register" className="bg-red-700 text-white px-4 py-2 rounded">Créer un compte</Link>
          <Link to="/login" className="bg-red-700 text-white px-4 py-2 rounded">Se connecter</Link>
        </div>
      </header>

      {/* Contenu des pages */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/trafic" element={<Trafic />} />
        <Route path="/bilan" element={<div className='p-6'>Page Bilan carbone</div>} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/login" element={<Connexion />} />
      </Routes>

      {/* Footer global */}
      <footer className="flex justify-between items-center p-6 mt-6 text-sm bg-white border-t">
        <div className="space-y-2">
          <p className="font-bold">Itinéraires</p>
          <p className="font-bold">Traffic</p>
          <p className="font-bold">Bilan carbone</p>
        </div>
        <div className="flex items-center space-x-4">
          <span>Nous suivre</span>
          <img src="/facebook.png" alt="Facebook" className="h-6" />
          <img src="/instagram.jpg" alt="Instagram" className="h-6" />
          <img src="/linkedin.jpg" alt="LinkedIn" className="h-6" />
        </div>
      </footer>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);