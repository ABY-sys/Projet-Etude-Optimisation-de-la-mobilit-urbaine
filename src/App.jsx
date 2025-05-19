import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Connexion from "./Pages/Connexion";
import Inscription from "./Pages/Inscription";
import Itineraires from "./Pages/Itineraires";
import BilanCarbone from "./Pages/Bilan_carbone";
import TestMap from "./Pages/test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Connexion" element={<Connexion/>} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Itineraires" element={<Itineraires />} />
        <Route path="/Bilan_Carbone" element={<BilanCarbone />} />
        <Route path="/test" element={<TestMap />} />
      </Routes>
    </Router>
  );
}

export default App;
