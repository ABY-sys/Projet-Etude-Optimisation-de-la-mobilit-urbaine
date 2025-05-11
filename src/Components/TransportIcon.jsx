import React from 'react';
import { FaWalking, FaBicycle, FaCar, FaBus, FaTrain, FaSubway, FaTram } from 'react-icons/fa';

const TransportIcon = ({ mode }) => {
  const upperMode = mode?.toUpperCase();

  switch (upperMode) {
    case 'WALKING':
      return <FaWalking />;
    case 'BICYCLING':
      return <FaBicycle />;
    case 'DRIVING':
      return <FaCar />;
    case 'BUS':
      return <FaBus />;
    case 'TRAIN':
      return <FaTrain />;
    case 'SUBWAY':
      return <FaSubway />;
    case 'TRAM':
      return <FaTram />;
    case 'TRANSIT':
      return <FaBus />; // ou un mix FaBus / FaTrain
    default:
      return null;
  }
};

export default TransportIcon;
