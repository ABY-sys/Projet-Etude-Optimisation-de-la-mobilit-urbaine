import React from 'react';
import { FaWalking, FaBicycle, FaCar, FaSubway, FaBus } from 'react-icons/fa';

const getTransportIcon = (mode) => {
  switch (mode?.toUpperCase()) {
    case 'WALKING': return <FaWalking />;
    case 'BICYCLING': return <FaBicycle />;
    case 'DRIVING': return <FaCar />;
    case 'BUS': return <FaBus />;
    case 'SUBWAY':
    case 'TRAIN':
    case 'TRAM':
    case 'TRANSIT': return <FaSubway />;
    default: return null;
  }
};

const ItinerarySummary = ({ steps, onShowDetails }) => {
  if (!steps || !Array.isArray(steps)) {
    return <div>Aucune étape disponible.</div>; 
  }
  const segments = steps.map((step, index) => {
    const mode = step.transit?.line?.vehicle?.type || step.travel_mode;
    const iconReact = getTransportIcon(mode);
    const iconUrl = step.transit?.line?.vehicle?.icon;
    const duration = step.duration || '';
    const lineName = step.transit?.line?.name;


    let icon = iconReact;

    // Préfère l'icône de l'API si disponible
    if ((mode?.toUpperCase() === 'TRANSIT' || step.transit) && iconUrl) {
      icon = (
        <img
          src={iconUrl.startsWith('http') ? iconUrl : `https:${iconUrl}`}
          alt="transit icon"
          style={{ width: 20, height: 20 }}
        />
      );
    }

    return (
      <span key={index} className="d-flex align-items-center me-2">
        {icon && <span className="me-1">{icon}</span>}
        {lineName && <span className="me-1"><strong>{lineName}</strong></span>}
        <span className="me-1">{duration}</span>
        {index !== steps.length - 1 && <span className="mx-1">—</span>}
      </span>
    );
  });

  return (
    <div className="itinerary-summary p-2 bg-white border rounded shadow-sm cursor-pointer" onClick={onShowDetails}>
      <div className="d-flex flex-wrap align-items-center">
        {segments}
      </div>
    </div>
  );
};

export default ItinerarySummary;
