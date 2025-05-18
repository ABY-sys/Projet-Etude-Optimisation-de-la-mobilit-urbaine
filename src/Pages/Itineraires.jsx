import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AddressInput from '../Components/AddressInput';
import TransportIcons from '../Components/TransportIcons';
import ItineraryDetails from '../Components/ItineraryDetails';
import ItinerarySummary from '../Components/ItinerarySummary'; 
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Itineraires = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialDepart = queryParams.get('depart') || '';
  const initialArrivee = queryParams.get('arrivee') || '';

  const [depart, setDepart] = useState(initialDepart);
  const [arrivee, setArrivee] = useState(initialArrivee);
  const [transport, setTransport] = useState('TRANSIT'); 
  const [directions, setDirections] = useState(null);
  const [durations, setDurations] = useState({});
  const [autocompleteDepart, setAutocompleteDepart] = useState([]);
  const [autocompleteArrivee, setAutocompleteArrivee] = useState([]);
  const [itineraireDetails, setItineraireDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const center = { lat: 48.8566, lng: 2.3522 };
  const libraries = ["places"];

  const handleMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (depart && arrivee && mapLoaded) {
      handleSearch();
    }
  }, [depart, arrivee, mapLoaded]);
  
  
  

  const handleAddressChange = (input, setAutocomplete) => {
    if (window.google && input.length > 2) {
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

  const parseSteps = (steps) =>
    steps.map((step) => ({
      instruction: step.instructions,
      distance: step.distance?.text || '',
      duration: step.duration?.text || '',
      travel_mode: step.travel_mode,
      transit: step.travel_mode === "TRANSIT" ? {
        line: step.transit?.line?.name,
        departure: step.transit?.departure_time?.text || '',
        arrival: step.transit?.arrival_time?.text || '',
        num_stops: step.transit?.num_stops || 0
      } : null
    }));

  const getGoogleTravelMode = (key) => {
    const modes = {
      BICYCLING: window.google.maps.TravelMode.BICYCLING,
      WALKING: window.google.maps.TravelMode.WALKING,
      DRIVING: window.google.maps.TravelMode.DRIVING,
      TRANSIT: window.google.maps.TravelMode.TRANSIT,
    };
    return modes[key];
  };

  const fetchDirections = async (modeKey) => {
    if (!depart || !arrivee) return;
    const travelMode = getGoogleTravelMode(modeKey);
    if (!travelMode) return;

    try {
      setIsLoading(true);
      const directionsService = new window.google.maps.DirectionsService();
      const result = await new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin: depart,
            destination: arrivee,
            travelMode,
            unitSystem: window.google.maps.UnitSystem.METRIC,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              resolve(result);
            } else {
              reject(status);
            }
          }
        );
      });

      setDirections(result);
      setTransport(modeKey);

      const steps = parseSteps(result.routes[0].legs[0].steps);
      setItineraireDetails((prev) => ({
        ...prev,
        [modeKey]: steps
      }));

    } catch (error) {
      console.error("Erreur de directions:", error);
      setErrorMessage(`Impossible de récupérer l'itinéraire pour le mode ${modeKey}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!depart || !arrivee) return;

    setIsLoading(true);
    setErrorMessage('');
    try {
      const modes = {
        BICYCLING: window.google.maps.TravelMode.BICYCLING,
        WALKING: window.google.maps.TravelMode.WALKING,
        DRIVING: window.google.maps.TravelMode.DRIVING,
        TRANSIT: window.google.maps.TravelMode.TRANSIT,
      };

      const results = await Promise.all(
        Object.entries(modes).map(async ([key, mode]) => {
          const directionsService = new window.google.maps.DirectionsService();
          return new Promise((resolve) => {
            directionsService.route(
              {
                origin: depart,
                destination: arrivee,
                travelMode: mode
              },
              (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  resolve({ key, result });
                } else {
                  resolve({ key, result: null });
                }
              }
            );
          });
        })
      );

      const newDurations = {};
      const newItineraries = {};

      results.forEach(({ key, result }) => {
        if (result) {
          newDurations[key] = result.routes[0].legs[0].duration.text;
          newItineraries[key] = parseSteps(result.routes[0].legs[0].steps);
        }
      });

      setDurations(newDurations);
      setItineraireDetails(newItineraries);

      const transitResult = results.find(r => r.key === 'TRANSIT')?.result;
      if (transitResult) {
        setDirections(transitResult);
        setTransport('TRANSIT');
      } else if (results[0]?.result) {
        setDirections(results[0].result);
        setTransport(results[0].key);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setErrorMessage("Une erreur est survenue lors de la recherche des itinéraires.");
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
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <AddressInput
                  label="Départ"
                  value={depart}
                  onChange={handleDepartChange}
                  autocompleteList={autocompleteDepart}
                  onSelect={(address) => handleSelectAddress(address, setDepart, setAutocompleteDepart)}
                  disabled={!mapLoaded}
                />
                <AddressInput
                  label="Arrivée"
                  value={arrivee}
                  onChange={handleArriveeChange}
                  autocompleteList={autocompleteArrivee}
                  onSelect={(address) => handleSelectAddress(address, setArrivee, setAutocompleteArrivee)}
                  disabled={!mapLoaded}
                />
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={isLoading}
                >
                  {isLoading ? 'Recherche en cours...' : 'Rechercher'}
                </button>
              </form>

              <TransportIcons
                durations={durations}
                onTransportSelect={(mode) => {
                  fetchDirections(mode);
                  setTransport(mode);
                  setShowDetails(false); 
                }}
              />

              {transport === 'TRANSIT' ? (
                <>
                  <ItinerarySummary
                    steps={itineraireDetails[transport]}
                    onShowDetails={() => setShowDetails(true)} 
                  />
                  {showDetails && (
                    <ItineraryDetails
                      transport={transport}
                      steps={itineraireDetails[transport]}
                      isLoading={isLoading}
                    />
                  )}
                </>
              ) : (
                <ItineraryDetails
                  transport={transport}
                  steps={itineraireDetails[transport]}
                  isLoading={isLoading}
                />
              )}
            </div>

            <div className="col-md-6">
              <LoadScript
                googleMapsApiKey={import.meta.env.VITE_API_KEY_PROJECT}
                libraries={libraries}
                onLoad={handleMapLoad}
              >
                <GoogleMap
                  mapContainerClassName="map-container"
                  center={center}
                  zoom={13}
                  options={{ disableDefaultUI: true, zoomControl: true }}
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
