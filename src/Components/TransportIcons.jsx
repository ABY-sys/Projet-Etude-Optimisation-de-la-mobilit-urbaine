import React from 'react';
import { FaWalking, FaBicycle, FaCar, FaBus } from 'react-icons/fa';

const TransportIcons = ({ durations, onTransportSelect }) => {
  const modes = [
    { label: 'Marche', value: 'WALKING', icon: <FaWalking /> },
    { label: 'Vélo', value: 'BICYCLING', icon: <FaBicycle /> },
    { label: 'Voiture', value: 'DRIVING', icon: <FaCar /> },
    { label: 'Transports', value: 'TRANSIT', icon: <FaBus /> }
  ];

  return (
    <div className="transport-icons">
      {modes.map(({ label, value, icon }) => (
        <div
          key={value}
          className="transport-button"
          onClick={() => onTransportSelect(value)}
        >
          <div>{icon}</div>
          <div>{label}</div>
          <div className="transport-duration">
            {durations[value] ? durations[value] : '-'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransportIcons;