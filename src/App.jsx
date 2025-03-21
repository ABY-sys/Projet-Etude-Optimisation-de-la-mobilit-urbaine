import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Itineraries from "./pages/Itineraries";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route> index element ={<Home />} </Route>
        <Route path="/Home" element={<Home />} />
        <Route path="/itinerares" element={<Itineraires />} />
        <Route path="/Bilan_carbone" element={<Bilan_carbone />} />
      </Routes>
    </Router>
  );
}

export default App;
