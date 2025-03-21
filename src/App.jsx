import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Itineraires from './Pages/Itineraires';
import BilanCarbone from './Pages/Bilan_carbone';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Page d'accueil */}
        <Route path="/Itineraires" element={<Itineraires />} /> {/* Page des itinéraires */}
        <Route path="/Bilan_carbone" element={<BilanCarbone />} /> {/* Page du bilan carbone */}
      </Routes>
    </Router>
  );
}


