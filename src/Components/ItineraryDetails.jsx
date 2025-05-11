import React from 'react';
import { FaWalking, FaBicycle, FaCar, FaSubway, FaBus } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

// Icônes de transport avec accessibilité
const TransportIcon = ({ mode }) => {
  const normalizedMode = mode?.toUpperCase();
  switch (normalizedMode) {
    case 'WALKING':
      return <FaWalking aria-label="Marche" />;
    case 'BICYCLING':
      return <FaBicycle aria-label="Vélo" />;
    case 'DRIVING':
      return <FaCar aria-label="Voiture" />;
    case 'TRANSIT':
      return <FaSubway aria-label="Métro" />;
  }
};

// Traduction transport
const formatTransportName = (transport) => {
  const transportMap = {
    WALKING: 'Marche',
    BICYCLING: 'Vélo',
    DRIVING: 'Voiture',
    TRANSIT: 'Transports en commun',
  };
  return transportMap[transport] || transport;
};

// Nettoyage HTML sans DOM
const stripHtml = (html) => html?.replace(/<[^>]+>/g, '') || '';

const ItineraryDetails = ({ transport, steps, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Chargement des étapes...</p>
      </div>
    );
  }

  return (
    <div className="itinerary-details mt-4 p-3 border rounded bg-light">
      <h4 className="mb-3 text-center">
        <TransportIcon mode={transport} />
        <span className="ms-2">Itinéraire {formatTransportName(transport)}</span>
      </h4>

      {!steps || steps.length === 0 ? (
        <div className="text-muted text-center py-3">
          Aucun itinéraire trouvé. Veuillez saisir des adresses valides.
        </div>
      ) : (
        <div className="steps-container">
          {steps.map((step, index) => {
            const mode = step.transit?.line?.vehicle?.type || step.travel_mode || transport;

            return (
              <div key={index} className="step-item mb-3 p-3 bg-white rounded shadow-sm">
                <div className="d-flex align-items-start">
                  <div className="step-icon me-3 mt-1">
                    <TransportIcon mode={mode} />
                  </div>
                  <div className="step-content flex-grow-1">
                    <div className="fw-bold">
                      {stripHtml(step.instruction)}
                    </div>

                    {(step.distance || step.duration) && (
                      <div className="step-meta text-muted small mt-2">
                        {step.distance && (
                          <span className="me-3">
                            <i className="bi bi-signpost me-1"></i>
                            {step.distance}
                          </span>
                        )}
                        {step.duration && (
                          <span>
                            <i className="bi bi-clock me-1"></i>
                            {step.duration}
                          </span>
                        )}
                      </div>
                    )}

                    {step.travel_mode === 'TRANSIT' && step.transit && (
                      <div className="transit-details bg-light p-2 mt-2 small rounded border">
                        <div className="d-flex flex-wrap">
                          {step.transit.line && (
                            <div className="me-3 mb-1">
                              <strong>Ligne:</strong> {step.transit.line}
                            </div>
                          )}
                          {step.transit.departure && (
                            <div className="me-3 mb-1">
                              <strong>Départ:</strong> {step.transit.departure}
                            </div>
                          )}
                          {step.transit.arrival && (
                            <div className="me-3 mb-1">
                              <strong>Arrivée:</strong> {step.transit.arrival}
                            </div>
                          )}
                          {step.transit.num_stops > 0 && (
                            <div className="mb-1">
                              <strong>Arrêts:</strong> {step.transit.num_stops}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ItineraryDetails;
