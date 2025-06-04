import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import AddressInput from "../Components/AddressInput"; 
import '../index.css';
import gareImage from '../Images/gare.jpg';

// Importation des icônes
import rerIcon from '../Images/Paris_transit_icons_-_RER.svg.png';
import metroIcon from '../Images/Paris_transit_icons_-_Métro.svg.png'; 
import tramIcon from '../Images/Paris_transit_icons_-_Tram.svg.png'; 
import transilienIcon from '../Images/Paris_transit_icons_-_Train.svg.png'; 

import lineRERAIcon from '../Images/Paris_transit_icons_-_RER_A.svg.png';
import lineRERBIcon from '../Images/Paris_transit_icons_-_RER_B.svg.png';
import lineRERCIcon from '../Images/Paris_transit_icons_-_RER_C.svg.png';
import lineRERDIcon from '../Images/Paris_transit_icons_-_RER_D.svg.png';
import lineREREIcon from '../Images/Paris_transit_icons_-_RER_E.svg.png';

import lineM1Icon from '../Images/Paris_transit_icons_-_Métro_1.svg.png';
import lineM2Icon from '../Images/Paris_transit_icons_-_Métro_2.svg.png';
import lineM3bisIcon from '../Images/Paris_transit_icons_-_Métro_3bis.svg.png';
import lineM4Icon from '../Images/Paris_transit_icons_-_Métro_4.svg.png';
import lineM5Icon from '../Images/Paris_transit_icons_-_Métro_5.svg.png';
import lineM6Icon from '../Images/Paris_transit_icons_-_Métro_6.svg.png';
import lineM7Icon from '../Images/Paris_transit_icons_-_Métro_7.svg.png';
import lineM8Icon from '../Images/Paris_transit_icons_-_Métro_8.svg.png';
import lineM9Icon from '../Images/Paris_transit_icons_-_Métro_9.svg.png';
import lineM10Icon from '../Images/Paris_transit_icons_-_Métro_10.svg.png';
import lineM11Icon from '../Images/Paris_transit_icons_-_Métro_11.svg.png';
import lineM12Icon from '../Images/Paris_transit_icons_-_Métro_12.svg.png';
import lineM13Icon from '../Images/Paris_transit_icons_-_Métro_13.svg.png';
import lineM14Icon from '../Images/Paris_transit_icons_-_Métro_14.svg.png';

import lineT1Icon from '../Images/Paris_transit_icons_-_Tram_1.svg.png'; 
import lineT2Icon from '../Images/Paris_transit_icons_-_Tram_2.svg.png'; 
import lineT3aIcon from '../Images/Paris_transit_icons_-_Tram_3a.svg.png'; 
import lineT3bIcon from '../Images/Paris_transit_icons_-_Tram_3b.svg.png'; 
import lineT4Icon from '../Images/Paris_transit_icons_-_Tram_4.svg.png'; 
import lineT5Icon from '../Images/Paris_transit_icons_-_Tram_5.svg.png'; 
import lineT6Icon from '../Images/Paris_transit_icons_-_Tram_6.svg.png'; 
import lineT7Icon from '../Images/Paris_transit_icons_-_Tram_7.svg.png'; 
import lineT8Icon from '../Images/Paris_transit_icons_-_Tram_8.svg.png'; 
import lineT9Icon from '../Images/Paris_transit_icons_-_Tram_9.svg.png'; 
import lineT10Icon from '../Images/Paris_transit_icons_-_Tram_10.svg.png'; 
import lineT11Icon from '../Images/Paris_transit_icons_-_Tram_11.svg.png'; 
import lineT12Icon from '../Images/Paris_transit_icons_-_Tram_12.svg.png'; 
import lineT13Icon from '../Images/Paris_transit_icons_-_Tram_13.svg.png'; 
import lineT14Icon from '../Images/Paris_transit_icons_-_Tram_14.svg.png'; 

import lineHIcon from '../Images/Paris_transit_icons_-_Train_H.svg.png';
import lineJIcon from '../Images/Paris_transit_icons_-_Train_J.svg.png';
import lineKIcon from '../Images/Paris_transit_icons_-_Train_K.svg.png';
import lineLIcon from '../Images/Paris_transit_icons_-_Train_L.svg.png';
import lineNIcon from '../Images/Paris_transit_icons_-_Train_N.svg.png';
import linePIcon from '../Images/Paris_transit_icons_-_Train_P.svg.png';
import lineRIcon from '../Images/Paris_transit_icons_-_Train_R.svg.png';
import lineUIcon from '../Images/Paris_transit_icons_-_Train_U.svg.png';
import lineVIcon from '../Images/Paris_transit_icons_-_Train_V.svg.png';

import clockIcon from '../Images/refresh.png';

const TRANSPORTS = {
  RER: [
    { name: "RER", icon: rerIcon },
    { name: "A", icon: lineRERAIcon },
    { name: "B", icon: lineRERBIcon },
    { name: "C", icon: lineRERCIcon },
    { name: "D", icon: lineRERDIcon },
    { name: "E", icon: lineREREIcon },
  ],
  Metro: [
    { name: "Métro", icon: metroIcon },
    { name: "1", icon: lineM1Icon },
    { name: "2", icon: lineM2Icon },
    { name: "3bis", icon: lineM3bisIcon },
    { name: "4", icon: lineM4Icon },
    { name: "5", icon: lineM5Icon },
    { name: "6", icon: lineM6Icon },
    { name: "7", icon: lineM7Icon },
    { name: "8", icon: lineM8Icon },
    { name: "9", icon: lineM9Icon },
    { name: "10", icon: lineM10Icon },
    { name: "11", icon: lineM11Icon },
    { name: "12", icon: lineM12Icon },
    { name: "13", icon: lineM13Icon },
    { name: "14", icon: lineM14Icon },
  ],
  Tram: [
    { name: "Tram", icon: tramIcon },
    { name: "T1", icon: lineT1Icon },
    { name: "T2", icon: lineT2Icon },
    { name: "T3a", icon: lineT3aIcon },
    { name: "T3b", icon: lineT3bIcon },
    { name: "T4", icon: lineT4Icon },
    { name: "T5", icon: lineT5Icon },
    { name: "T6", icon: lineT6Icon },
    { name: "T7", icon: lineT7Icon },
    { name: "T8", icon: lineT8Icon },
    { name: "T9", icon: lineT9Icon },
    { name: "T10", icon: lineT10Icon },
    { name: "T11", icon: lineT11Icon },
    { name: "T12", icon: lineT12Icon },
    { name: "T13", icon: lineT13Icon },
    { name: "T14", icon: lineT14Icon },
  ],
  Train: [
    { name: "Train", icon: transilienIcon },
    { name: "H", icon: lineHIcon },
    { name: "J", icon: lineJIcon },
    { name: "K", icon: lineKIcon },
    { name: "L", icon: lineLIcon },
    { name: "N", icon: lineNIcon },
    { name: "P", icon: linePIcon },
    { name: "R", icon: lineRIcon },
    { name: "U", icon: lineUIcon },
    { name: "V", icon: lineVIcon },
  ],
};

const Home = () => {
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [autocompleteDepart, setAutocompleteDepart] = useState([]);
  const [autocompleteArrivee, setAutocompleteArrivee] = useState([]);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_KEY_PROJECT}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setGoogleLoaded(true);
        document.head.appendChild(script);
      } else {
        setGoogleLoaded(true);
      }
    };

    loadGoogleMaps();
  }, []);

  const updateCurrentTime = () => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit'};
    setCurrentTime(now.toLocaleTimeString([], options));
  };

  useEffect(() => {
    updateCurrentTime();
  }, []);

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
      setIsLoading(true);
      navigate(`/Itineraires?depart=${encodeURIComponent(depart)}&arrivee=${encodeURIComponent(arrivee)}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <h1>Accueil</h1>

        <div className="gare-section">
          <img src={gareImage} alt="Gare" className="gare-image" />
          <div className="form-container">
            <h2 className="form-title text-center">Où allez-vous?</h2>
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
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={isLoading || !googleLoaded}
                >
                  {isLoading ? 'Recherche en cours...' : 'Rechercher'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Section trafic modifiée pour correspondre à l'image */}
        <div className="traffic-container">
          <h3 className="traffic-title">Situation du trafic sur les transports en Île-de-France</h3>

          <div className="traffic-grid">
            {/* RER */}
            <div className="transport-category">
              <div className="transport-header">
                <img src={rerIcon} alt="RER" className="transport-icon" />
              </div>
              <div className="transport-lines">
                {TRANSPORTS.RER.slice(1).map((line) => (
                  <img
                    key={line.name}
                    src={line.icon}
                    alt={line.name}
                    className="line-icon"
                  />
                ))}
              </div>
            </div>

            {/* Métro */}
            <div className="transport-category">
              <div className="transport-header">
                <img src={metroIcon} alt="Métro" className="transport-icon" />
                <span className="transport-name">Métro</span>
              </div>
              <div className="transport-lines">
                {TRANSPORTS.Metro.slice(1).map((line) => (
                  <img
                    key={line.name}
                    src={line.icon}
                    alt={line.name}
                    className="line-icon"
                  />
                ))}
              </div>
            </div>

            {/* Tram */}
            <div className="transport-category">
              <div className="transport-header">
                <img src={tramIcon} alt="Tram" className="transport-icon" />
                <span className="transport-name">Tram</span>
              </div>
              <div className="transport-lines">
                {TRANSPORTS.Tram.slice(1).map((line) => (
                  <img
                    key={line.name}
                    src={line.icon}
                    alt={line.name}
                    className="line-icon"
                  />
                ))}
              </div>
            </div>

            {/* Train */}
            <div className="transport-category">
              <div className="transport-header">
                <img src={transilienIcon} alt="Train" className="transport-icon" />
                <span className="transport-name">Train</span>
              </div>
              <div className="transport-lines">
                {TRANSPORTS.Train.slice(1).map((line) => (
                  <img
                    key={line.name}
                    src={line.icon}
                    alt={line.name}
                    className="line-icon"
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="traffic-update-time">
            <img
              src={clockIcon}
              alt="Mise à jour"
              className="clock-icon"
            />
            Données mises à jour à {currentTime}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
