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
  const [center, setCenter] = useState({ lat: 48.8566, lng: 2.3522 }); // Paris par défaut
  const [directions, setDirections] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour mapper les valeurs du sélecteur aux valeurs de l'API
  const getTravelMode = (mode) => {
    switch (mode) {
      case 'velo':
        return 'BICYCLE';
      case 'pied':
        return 'WALK';
      case 'voiture':
        return 'DRIVE';
      case 'transport_commun':
        return 'TRANSIT';
      default:
        return 'DRIVE'; // Valeur par défaut
    }
  };

  const handleSearch = async () => {
    if (!depart || !arrivee) {
      alert("Veuillez saisir une adresse de départ et d'arrivée.");
      return;
    }

    setIsLoading(true);

    // Configuration de la requête à l'API Routes
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origin: { address: depart },
        destination: { address: arrivee },
        travelMode: getTravelMode(transport),
        key: import.meta.env.API_KEY_PROJECT, // Remplace par ta clé API
      }),
    };

    try {
      const response = await fetch(
        'https://routes.googleapis.com/directions/v2:computeRoutes',
        requestOptions
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        // Convertir la réponse de l'API Routes en format compatible avec DirectionsRenderer
        const directionsResult = {
          routes: data.routes,
          request: {
            travelMode: getTravelMode(transport),
            origin: { query: depart },
            destination: { query: arrivee },
          },
        };
        setDirections(directionsResult);
      } else {
        console.error("Aucun itinéraire trouvé.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête à l'API Routes :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="content">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <form>
                <div className="mb-3">
                  <label htmlFor="depart" className="form-label">Départ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="depart"
                    value={depart}
                    onChange={(e) => setDepart(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="arrivee" className="form-label">Arrivée</label>
                  <input
                    type="text"
                    className="form-control"
                    id="arrivee"
                    value={arrivee}
                    onChange={(e) => setArrivee(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="transport" className="form-label">Moyen de transport</label>
                  <select
                    className="form-select"
                    id="transport"
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                  >
                    <option value="velo">Vélo</option>
                    <option value="pied">À pied</option>
                    <option value="voiture">Voiture</option>
                    <option value="transport_commun">Transport en commun</option>
                  </select>
                </div>
                <button type="button" className="btn btn-danger" onClick={handleSearch}>
                  Rechercher
                </button>
              </form>
              {isLoading && <p>Calcul de l'itinéraire en cours...</p>}
            </div>
            <div className="col-md-6">
              <LoadScript googleMapsApiKey={import.meta.env.API_KEY_PROJECT}>
                <GoogleMap
                  mapContainerClassName="map-container"
                  center={center}
                  zoom={12}
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