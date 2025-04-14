import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../index.css';

const testMap = () => {
  const [depart, setDepart] = useState('');
  const [arrivee, setArrivee] = useState('');
  const [directions, setDirections] = useState(null);
  const center = { lat: 48.8566, lng: 2.3522 }; // Paris

  const handleSearch = () => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: depart,
        destination: arrivee,
        travelMode: window.google.maps.TravelMode.TRANSIT,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${result}`);
          alert('Impossible de trouver l\'itinéraire. Veuillez vérifier les adresses.');
        }
      }
    );
  };

  return (
    <div>
      <input type="text" value={depart} onChange={(e) => setDepart(e.target.value)} placeholder="Départ" />
      <input type="text" value={arrivee} onChange={(e) => setArrivee(e.target.value)} placeholder="Arrivée" />
      <button onClick={handleSearch}>Rechercher</button>

      {directions && <ItineraireSuggestion directions={directions} />}
      
      <LoadScript googleMapsApiKey={import.meta.env.VITE_API_KEY_PROJECT}>
        <GoogleMap
          center={center}
          zoom={13}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

const ItineraireSuggestion = ({ directions }) => {
  return (
    <div>
      <h3>Notre suggestion</h3>
      <p>Durée totale : {directions.routes[0].legs[0].duration.text}</p>
      <ul>
        {directions.routes[0].legs[0].steps.map((step, index) => (
          <li key={index}>
            {step.travel_mode === "TRANSIT" ? (
              <span>
                <strong>{step.transit.line.short_name}</strong> - {step.html_instructions}
              </span>
            ) : (
              <span>{step.html_instructions}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default testMap;
