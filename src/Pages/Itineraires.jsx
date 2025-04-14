import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../index.css';

const Itineraires = () => {
  const [depart, setDepart] = useState('');
  const [arrivee, setArrivee] = useState('');
  const [transport, setTransport] = useState('velo');
  const [directions, setDirections] = useState(null); // État pour stocker les directions
  const [durations, setDurations] = useState({}); // État pour stocker les durées
  const [autocompleteDepart, setAutocompleteDepart] = useState([]);
  const [autocompleteArrivee, setAutocompleteArrivee] = useState([]);
  const [itineraireDetails, setItineraireDetails] = useState({}); // État pour stocker les détails de l'itinéraire par mode de transport

  const center = { lat: 48.8566, lng: 2.3522 }; // Paris

  // Fonction pour calculer les durées
  const handleSearch = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const travelModes = {
      velo: window.google.maps.TravelMode.BICYCLING,
      pied: window.google.maps.TravelMode.WALKING,
      voiture: window.google.maps.TravelMode.DRIVING,
      transport_commun: window.google.maps.TravelMode.TRANSIT,
    };

    // Calculer les directions pour chaque moyen de transport
    Object.keys(travelModes).forEach((mode) => {
      directionsService.route(
        {
          origin: depart,
          destination: arrivee,
          travelMode: travelModes[mode],
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            console.log(`Directions for ${mode}:`, result); // Ajoutez cette ligne
            setDurations((prev) => ({ ...prev, [mode]: result.routes[0].legs[0].duration.text }));
            // Extraire les détails de l'itinéraire
            const steps = result.routes[0].legs[0].steps.map((step) => ({
              instruction: step.html_instructions,
              transit: step.travel_mode === "TRANSIT" ? step.transit.line.short_name : null,
              waitTime: step.transit ? step.transit.num_stops : null, // Nombre d'arrêts pour le transit
              arrivalTime: step.transit ? new Date(Date.now() + step.duration.value * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null, // Heure d'arrivée estimée
            }));
            setItineraireDetails((prev) => ({ ...prev, [mode]: steps })); // Met à jour les détails de l'itinéraire pour le mode sélectionné
          } else {
            console.error(`Error fetching directions: ${result}`);
            alert('Impossible de trouver l\'itinéraire. Veuillez vérifier les adresses.');
          }
        }
      );
    });
  };

  // Fonction pour tracer l'itinéraire en fonction du moyen de transport sélectionné
  const handleTransportClick = (mode) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: depart,
        destination: arrivee,
        travelMode: mode,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setTransport(mode); // Met à jour le mode de transport sélectionné
          // Extraire les détails de l'itinéraire
          const steps = result.routes[0].legs[0].steps.map((step) => ({
            instruction: step.html_instructions,
            transit: step.travel_mode === "TRANSIT" ? step.transit.line.short_name : null,
            waitTime: step.transit ? step.transit.num_stops : null, // Nombre d'arrêts pour le transit
            arrivalTime: step.transit ? new Date(Date.now() + step.duration.value * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null, // Heure d'arrivée estimée
          }));
          setItineraireDetails((prev) => ({ ...prev, [mode]: steps })); // Met à jour les détails de l'itinéraire pour le mode sélectionné
        } else {
          console.error(`Error fetching directions: ${result}`);
          alert('Impossible de trouver l\'itinéraire. Veuillez vérifier les adresses.');
        }
      }
    );
  };

  // Fonction pour gérer l'auto-complétion
  const handleAddressChange = (input, setAutocomplete) => {
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setAutocomplete(predictions);
      }
    });
  };

  // Fonction pour gérer le changement d'adresse
  const handleDepartChange = (e) => {
    setDepart(e.target.value);
    handleAddressChange(e.target.value, setAutocompleteDepart);
  };

  const handleArriveeChange = (e) => {
    setArrivee(e.target.value);
    handleAddressChange(e.target.value, setAutocompleteArrivee);
  };

  // Fonction pour gérer la sélection d'une adresse
  const handleSelectAddress = (address, setAddress, setAutocomplete) => {
    setAddress(address);
    setAutocomplete([]); // Efface les suggestions
  };

  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <div className="mb-3">
                  <label htmlFor="depart" className="form-label">Départ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="depart"
                    value={depart}
                    onChange={handleDepartChange}
                  />
                  <ul className="autocomplete-list">
                    {autocompleteDepart.map((place) => (
                      <li key={place.place_id} onClick={() => handleSelectAddress(place.description, setDepart, setAutocompleteDepart)}>
                        {place.description}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-3">
                  <label htmlFor="arrivee" className="form-label">Arrivée</label>
                  <input
                    type="text"
                    className="form-control"
                    id="arrivee"
                    value={arrivee}
                    onChange={handleArriveeChange}
                  />
                  <ul className="autocomplete-list">
                    {autocompleteArrivee.map((place) => (
                      <li key={place.place_id} onClick={() => handleSelectAddress(place.description, setArrivee, setAutocompleteArrivee)}>
                        {place.description}
                      </li>
                    ))}
                  </ul>
                </div>
                <button type="submit" className="btn btn-danger">
                  Rechercher
                </button>
              </form>
              <div className="transport-icons mt-3 d-flex justify-content-between">
                <button onClick={() => handleTransportClick(window.google.maps.TravelMode.TRANSIT)} className="transport-button">
                  <img src="Images/transport_commun.png" alt="Transport Commun" />
                  <p>{durations.transport_commun || 'N/A'}</p>
                </button>
                <button onClick={() => handleTransportClick(window.google.maps.TravelMode.WALKING)} className="transport-button">
                  <img src="Images/marche.png" alt="Marche" />
                  <p>{durations.pied || 'N/A'}</p>
                </button>
                <button onClick={() => handleTransportClick(window.google.maps.TravelMode.BICYCLING)} className="transport-button">
                  <img src="Images/velo.png" alt="Vélo" />
                  <p>{durations.velo || 'N/A'}</p>
                </button>
                <button onClick={() => handleTransportClick(window.google.maps.TravelMode.DRIVING)} className="transport-button">
                  <img src="Images/voiture.png" alt="Voiture" />
                  <p>{durations.voiture || 'N/A'}</p>
                </button>
              </div>

              {/* Affichage des suggestions d'itinéraires pour le mode de transport sélectionné */}
              <div className="itineraire-suggestion mt-4">
                <h4>Suggestions d'itinéraires pour {transport}</h4>
                <ul>
                  {itineraireDetails[transport]?.map((step, index) => (
                    <li key={index}>
                      {step.transit ? (
                        <>
                          <strong>{step.transit}</strong> - {step.instruction} (Arrivée estimée : {step.arrivalTime}, Attente : {step.waitTime} arrêts)
                        </>
                      ) : (
                        step.instruction
                      )}
                    </li>
                  )) || <li>Aucune suggestion disponible.</li>}
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <LoadScript googleMapsApiKey={import.meta.env.VITE_API_KEY_PROJECT} libraries={['places']}>
                <GoogleMap
                  mapContainerClassName="map-container"
                  center={center}
                  zoom={13}
                  options={{
                    disableDefaultUI: true, // Désactive les contrôles par défaut
                    zoomControl: true, // Active le contrôle de zoom
                  }}
                >
                  {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Itineraires;
