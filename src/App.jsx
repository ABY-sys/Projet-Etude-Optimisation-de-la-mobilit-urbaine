import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Itineraires from "./Pages/Itineraires";
import BilanCarbone from "./Pages/Bilan_carbone";
import testMap from "./Pages/test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Itineraires" element={<Itineraires />} />
        <Route path="/Bilan_Carbone" element={<BilanCarbone />} />
        <Route path="/test" element={<testMap />} />
      </Routes>
    </Router>
  );
}

export default App;
