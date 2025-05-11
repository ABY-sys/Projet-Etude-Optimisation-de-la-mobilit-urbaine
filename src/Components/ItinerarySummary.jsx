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

const ItinerarySummary = ({ steps }) => {
  const segments = steps.map((step, index) => {
    const mode = step.transit?.line?.vehicle?.type || step.travel_mode;
    const icon = getTransportIcon(mode);
    const duration = step.duration || '';

    let label = '';
    if (step.transit?.line?.short_name) {
      label = step.transit.line.short_name;
    }

    return (
      <span key={index} className="d-flex align-items-center me-2">
        <span className="me-1">{icon}</span>
        <span className="me-1">
          {label && <strong>{label}</strong>} {duration}
        </span>
        {index !== steps.length - 1 && <span className="mx-1">—</span>}
      </span>
    );
  });

  return (
    <div className="itinerary-summary p-2 bg-white border rounded shadow-sm cursor-pointer">
      <div className="d-flex flex-wrap align-items-center">
        {segments}
      </div>
    </div>
  );
};

export default ItinerarySummary;
