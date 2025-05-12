import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import TransportIcon from './TransportIcon';

const ItineraryDetails = ({ transport, steps, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false); // État pour afficher les détails

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Chargement des étapes...</p>
      </div>
    );
  }

  return (
    <div className="itinerary-details mt-4">
      <h4 className="mb-3 text-center">
        <TransportIcon mode={transport} />
        <span className="ms-2"> Notre suggestion d'itinéraire</span>
      </h4>

      {!steps || steps.length === 0 ? (
        <div className="text-muted text-center py-3">
          Aucun itinéraire trouvé.
        </div>
      ) : (
        <div className="steps-container mt-3">
          {steps.map((step, index) => {
            const mode = step.transit?.line?.vehicle?.type || step.travel_mode || transport;
            const line = step.transit?.line;
            const stripHtml = (html) => html?.replace(/<[^>]+>/g, '') || '';

            return (
              <div key={index} className="step-item mb-3 p-3 bg-white rounded shadow-sm">
                <div className="d-flex align-items-start">
                  <div className="step-icon me-3 mt-1">
                    <TransportIcon mode={mode} line={line} />
                  </div>
                  <div className="step-content flex-grow-1">
                    <div className="fw-bold">{stripHtml(step.instruction)}</div>
                    {(step.distance || step.duration) && (
                      <div className="step-meta text-muted small mt-2">
                        {step.distance && <span className="me-3"><i className="bi bi-signpost me-1"></i>{step.distance}</span>}
                        {step.duration && <span><i className="bi bi-clock me-1"></i>{step.duration}</span>}
                      </div>
                    )}
                    {step.travel_mode === 'TRANSIT' && step.transit && (
                      <div className="transit-details bg-light p-2 mt-2 small rounded border">
                        <div className="d-flex flex-wrap">
                          {step.transit.line && (
                            <div className="me-3 mb-1">
                              <strong>Ligne:</strong> {step.transit.line.name}
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
