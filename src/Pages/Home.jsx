import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate pour la redirection
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import AddressInput from "../Components/AddressInput"; 
import '../index.css';

const Home = () => {
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [autocompleteDepart, setAutocompleteDepart] = useState([]);
  const [autocompleteArrivee, setAutocompleteArrivee] = useState([]);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Ajout de l'état isLoading
  const navigate = useNavigate(); // Hook pour la redirection

  const handleAddressChange = (input, setAutocomplete) => {
    if (googleLoaded && input.length > 2) {
      const autocompleteService = new window.google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        {
          input,
          componentRestrictions: { country: 'fr' },
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setAutocomplete(predictions);
          } else {
            setAutocomplete([]);
          }
        }
      );
    } else {
      setAutocomplete([]);
    }
  };

  const handleDepartChange = (e) => {
    setDepart(e.target.value);
    handleAddressChange(e.target.value, setAutocompleteDepart);
  };

  const handleArriveeChange = (e) => {
    setArrivee(e.target.value);
    handleAddressChange(e.target.value, setAutocompleteArrivee);
  };

  const handleSelectAddress = (address, setter, autocompleteSetter) => {
    setter(address);
    autocompleteSetter([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (depart && arrivee) {
      setIsLoading(true); // Démarrer le chargement
      // Rediriger vers la page d'itinéraire avec les paramètres
      navigate(`/Itineraires?depart=${encodeURIComponent(depart)}&arrivee=${encodeURIComponent(arrivee)}`);
      setIsLoading(true); // Arrêter le chargement après la redirection
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <h1>Accueil</h1>
        <div className="relative">
          <img src="public/Images/background_home_page.jpg" alt="Gare" className="img-fluid gare-image" />
          <div className="form-container">
            <h2 className="form-title">Où allez-vous?</h2>
            <form onSubmit={handleSearch}>
              <AddressInput
                label="Départ"
                value={depart}
                onChange={handleDepartChange}
                autocompleteList={autocompleteDepart}
                onSelect={(address) => handleSelectAddress(address, setDepart, setAutocompleteDepart)}
                disabled={!googleLoaded}
              />
              <AddressInput
                label="Arrivée"
                value={arrivee}
                onChange={handleArriveeChange}
                autocompleteList={autocompleteArrivee}
                onSelect={(address) => handleSelectAddress(address, setArrivee, setAutocompleteArrivee)}
                disabled={!googleLoaded}
              />
              <button
                type="submit"
                className="btn btn-danger"
                disabled={isLoading} // Désactiver le bouton si isLoading est vrai
              >
                {isLoading ? 'Recherche en cours...' : 'Rechercher'}
              </button>
            </form>
          </div>
        </div>

        <div className="traffic-container">
          <h3 className="traffic-title">Point traffic</h3>
          <div className="traffic-icons">
            {['RER', 'A', 'B', 'C', 'M', '14', '1', 'T12', 'T10', 'BUS'].map((line) => (
              <div key={line} className="traffic-icon" style={{ backgroundColor: getColor(line) }}>
                {line}
              </div>
            ))}
          </div>
          <p className="traffic-info">Cliquer ici pour plus d'informations</p>
        </div>
      </main>
      <Footer />
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

export default Home;
