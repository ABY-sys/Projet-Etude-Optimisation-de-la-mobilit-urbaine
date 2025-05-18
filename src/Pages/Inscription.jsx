import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      setMessage("Un compte existe déjà avec cet email.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Compte créé avec succès !");
    setTimeout(() => navigate("/login"), 1000);
  };

 return (
  <div className="relative min-h-screen">
    {/* Image de fond */}
    <img
      src="/gare.jpg"
      alt="fond"
      className="absolute inset-0 w-full h-full object-cover z-0"
    />

    {/* Overlay sombre léger */}
    <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

    {/* Formulaire centré */}
    <div className="relative z-20 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white bg-opacity-95 p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Créer un compte</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Adresse email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded w-full">
            Créer mon compte
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
      </div>
    </div>
  </div>
);
}