import { useState } from "react";

export default function Accueil() {
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative">
        <img src="/gare.jpg" alt="Gare" className="w-full h-[500px] object-cover" />
        <div className="absolute top-10 left-10 bg-red-700 bg-opacity-95 text-white p-6 rounded-lg w-[350px]">
          <h2 className="text-lg font-bold mb-4">Où allez-vous?</h2>
          <input className="w-full p-2 rounded text-black mb-4" placeholder="Départ" value={depart} onChange={(e) => setDepart(e.target.value)} />
          <input className="w-full p-2 rounded text-black mb-4" placeholder="Arrivée" value={arrivee} onChange={(e) => setArrivee(e.target.value)} />
          <div className="flex space-x-2 mb-4">
            <button className="flex-1 bg-white text-black p-2 rounded">Départ</button>
            <button className="flex-1 bg-white text-black p-2 rounded">Jour</button>
            <button className="flex-1 bg-white text-black p-2 rounded">Heure</button>
          </div>
          <button className="w-full bg-white text-black p-2 rounded font-bold">Rechercher</button>
        </div>
      </div>

      <div className="bg-white shadow p-6 mt-2 mx-4 rounded">
        <h3 className="font-bold text-lg mb-4">Point traffic</h3>
        <div className="flex flex-wrap gap-4 items-center">
          {['RER', 'A', 'B', 'C', 'M', '14', '1', 'T12', 'T10', 'BUS'].map((line) => (
            <div key={line} className="flex items-center justify-center w-12 h-12 rounded-full border font-bold text-lg" style={{ backgroundColor: getColor(line) }}>{line}</div>
          ))}
        </div>
        <p className="text-sm mt-2">Cliquer ici pour plus d'informations</p>
      </div>
    </div>
  );
}

function getColor(line) {
  const colors = {
    A: "#e30613",
    B: "#0078bf",
    C: "#fcd116",
    M: "#000000",
    '14': "#a4489a",
    '1': "#fcd116",
    T12: "#a1122f",
    T10: "#d0bb00",
    RER: "#ffffff",
    BUS: "#ffffff",
  };
  return colors[line] || "#dddddd";
}