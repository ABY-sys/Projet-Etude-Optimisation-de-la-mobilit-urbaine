import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

import rerIcon from '../Images/Paris_transit_icons_-_RER.svg.png';
import metroIcon from '../Images/Paris_transit_icons_-_Métro.svg.png'; 
import tramIcon from '../Images/Paris_transit_icons_-_Tram.svg.png'; 
import transilienIcon from '../Images/Paris_transit_icons_-_Train.svg.png'; 

// Importation des icônes pour chaque ligne
import lineRERAIcon from '../Images/Paris_transit_icons_-_RER_A.svg.png';
import lineRERBIcon from '../Images/Paris_transit_icons_-_RER_B.svg.png';
import lineRERCIcon from '../Images/Paris_transit_icons_-_RER_C.svg.png';
import lineRERDIcon from '../Images/Paris_transit_icons_-_RER_D.svg.png';
import lineREREIcon from '../Images/Paris_transit_icons_-_RER_E.svg.png';
import lineM1Icon from '../Images/Paris_transit_icons_-_Métro_1.svg.png';
import lineM2Icon from '../Images/Paris_transit_icons_-_Métro_2.svg.png';
import lineM3bisIcon from '../Images/Paris_transit_icons_-_Métro_3bis.svg.png';
import lineM4Icon from '../Images/Paris_transit_icons_-_Métro_4.svg.png';
import lineM5Icon from '../Images/Paris_transit_icons_-_Métro_5.svg.png';
import lineM6Icon from '../Images/Paris_transit_icons_-_Métro_6.svg.png';
import lineM7Icon from '../Images/Paris_transit_icons_-_Métro_7.svg.png';
import lineM8Icon from '../Images/Paris_transit_icons_-_Métro_8.svg.png';
import lineM9Icon from '../Images/Paris_transit_icons_-_Métro_9.svg.png';
import lineM10Icon from '../Images/Paris_transit_icons_-_Métro_10.svg.png';
import lineM11Icon from '../Images/Paris_transit_icons_-_Métro_11.svg.png';
import lineM12Icon from '../Images/Paris_transit_icons_-_Métro_12.svg.png';
import lineM13Icon from '../Images/Paris_transit_icons_-_Métro_13.svg.png';
import lineM14Icon from '../Images/Paris_transit_icons_-_Métro_14.svg.png';
import lineT1Icon from '../Images/Paris_transit_icons_-_Tram_1.svg.png'; 
import lineT2Icon from '../Images/Paris_transit_icons_-_Tram_2.svg.png'; 
import lineT3aIcon from '../Images/Paris_transit_icons_-_Tram_3a.svg.png'; 
import lineT3bIcon from '../Images/Paris_transit_icons_-_Tram_3b.svg.png'; 
import lineT4Icon from '../Images/Paris_transit_icons_-_Tram_4.svg.png'; 
import lineT5Icon from '../Images/Paris_transit_icons_-_Tram_5.svg.png'; 
import lineT6Icon from '../Images/Paris_transit_icons_-_Tram_6.svg.png'; 
import lineT7Icon from '../Images/Paris_transit_icons_-_Tram_7.svg.png'; 
import lineT8Icon from '../Images/Paris_transit_icons_-_Tram_8.svg.png'; 
import lineT9Icon from '../Images/Paris_transit_icons_-_Tram_9.svg.png'; 
import lineT10Icon from '../Images/Paris_transit_icons_-_Tram_10.svg.png'; 
import lineT11Icon from '../Images/Paris_transit_icons_-_Tram_11.svg.png'; 
import lineT12Icon from '../Images/Paris_transit_icons_-_Tram_12.svg.png'; 
import lineT13Icon from '../Images/Paris_transit_icons_-_Tram_13.svg.png'; 
import lineT14Icon from '../Images/Paris_transit_icons_-_Tram_14.svg.png'; 
import lineHIcon from '../Images/Paris_transit_icons_-_Train_H.svg.png';
import lineJIcon from '../Images/Paris_transit_icons_-_Train_J.svg.png';
import lineKIcon from '../Images/Paris_transit_icons_-_Train_K.svg.png';
import lineLIcon from '../Images/Paris_transit_icons_-_Train_L.svg.png';
import lineNIcon from '../Images/Paris_transit_icons_-_Train_N.svg.png';
import linePIcon from '../Images/Paris_transit_icons_-_Train_P.svg.png';
import lineRIcon from '../Images/Paris_transit_icons_-_Train_R.svg.png';
import lineUIcon from '../Images/Paris_transit_icons_-_Train_U.svg.png';
import lineVIcon from '../Images/Paris_transit_icons_-_Train_V.svg.png';
import clockIcon from '../Images/refresh.png';

import linesData from '/src/linesData.js';

const TRANSPORTS = {
  RER: [
    { name: "RER", icon: rerIcon },
    { name: "A", icon: lineRERAIcon },
    { name: "B", icon: lineRERBIcon },
    { name: "C", icon: lineRERCIcon },
    { name: "D", icon: lineRERDIcon },
    { name: "E", icon: lineREREIcon },
  ],
  Metro: [
    { name: "Métro", icon: metroIcon },
    { name: "1", icon: lineM1Icon },
    { name: "2", icon: lineM2Icon },
    { name: "3bis", icon: lineM3bisIcon },
    { name: "4", icon: lineM4Icon },
    { name: "5", icon: lineM5Icon },
    { name: "6", icon: lineM6Icon },
    { name: "7", icon: lineM7Icon },
    { name: "8", icon: lineM8Icon },
    { name: "9", icon: lineM9Icon },
    { name: "10", icon: lineM10Icon },
    { name: "11", icon: lineM11Icon },
    { name: "12", icon: lineM12Icon },
    { name: "13", icon: lineM13Icon },
    { name: "14", icon: lineM14Icon },
  ],
  Tram: [
    { name: "Tram", icon: tramIcon },
    { name: "T1", icon: lineT1Icon },
    { name: "T2", icon: lineT2Icon },
    { name: "T3a", icon: lineT3aIcon },
    { name: "T3b", icon: lineT3bIcon },
    { name: "T4", icon: lineT4Icon },
    { name: "T5", icon: lineT5Icon },
    { name: "T6", icon: lineT6Icon },
    { name: "T7", icon: lineT7Icon },
    { name: "T8", icon: lineT8Icon },
    { name: "T9", icon: lineT9Icon },
    { name: "T10", icon: lineT10Icon },
    { name: "T11", icon: lineT11Icon },
    { name: "T12", icon: lineT12Icon },
    { name: "T13", icon: lineT13Icon },
    { name: "T14", icon: lineT14Icon },
  ],
  Train: [
    { name: "Train", icon: transilienIcon },
    { name: "H", icon: lineHIcon },
    { name: "J", icon: lineJIcon },
    { name: "K", icon: lineKIcon },
    { name: "L", icon: lineLIcon },
    { name: "N", icon: lineNIcon },
    { name: "P", icon: linePIcon },
    { name: "R", icon: lineRIcon },
    { name: "U", icon: lineUIcon },
    { name: "V", icon: lineVIcon },
  ],
};

const Traffic = () => {
  const [selectedTab, setSelectedTab] = useState("General");
  const [selectedLine, setSelectedLine] = useState(null);  // { type: 'Metro', name: '1' }
  const [sideView, setSideView] = useState("line");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    updateCurrentTime();
    const timer = setInterval(updateCurrentTime, 10000); // actualisation toutes les 10s
    return () => clearInterval(timer);
  }, []);

  const updateCurrentTime = () => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    setCurrentTime(now.toLocaleTimeString([], options));
  };

  const handleLineClick = (transportType, line) => {
    setSelectedTab(transportType);
    setSelectedLine({ type: transportType, name: line.name });
    setSideView("line");
  };

  const getLineDetails = () => {
    if (!selectedLine) return null;
    
    const { type, name } = selectedLine;
    
    const dataCategory = {
      'RER': 'rerLines',
      'Metro': 'metroLines',
      'Tram': 'tramLines',
      'Train': 'transilienLines'
    }[type];

    if (linesData[dataCategory] && linesData[dataCategory][name]) {
      return {
        ...linesData[dataCategory][name],
        transportType: TRANSPORTS[type][0].name
      };
    }
    return null;
  };

  const lineDetails = getLineDetails();
  const shouldShowPanel = selectedLine && selectedTab === selectedLine.type;

  return (
    <div className="traffic-page-container">
      <Header />
      <main className="content mt-5">
        <div className="p-4">
          <div className="bg-danger rounded-top p-2 d-flex justify-content-between flex-wrap">
            <button
              onClick={() => setSelectedTab("General")}
              className={`traffic-btn ${
                selectedTab === "General"
                  ? "btn-danger text-white border-bottom border-white"
                  : "btn-danger text-white"
              } me-2`}
            >
              Vue générale
            </button>
            {Object.keys(TRANSPORTS).map((transportType) => (
              <button
                key={transportType}
                onClick={() => setSelectedTab(transportType)}
                className={`traffic-btn ${
                  selectedTab === transportType
                    ? "btn-danger text-white border-bottom border-white"
                    : "btn-danger text-white"
                } me-2`}
              >
                {transportType}
              </button>
            ))}
          </div>

          <div className="traffic-block">
            {selectedTab === "General" && (
              <>
                <h5 className="mb-3 d-flex align-items-center">
                  Situation du trafic sur les transports en Île-de-France
                  <button
                    onClick={updateCurrentTime}
                    className="traffic-refresh ms-2 p-0 border-0 bg-danger"
                    aria-label="Refresh"
                  >
                    <img
                      src={clockIcon}
                      alt="Refresh"
                      style={{ width: 24, height: 24 }}
                    />
                  </button>
                </h5>
                <p className="mb-3 text-white">
                  {currentTime && `Données mises à jour à ${currentTime}`}
                </p>
              </>
            )}

            <div className="d-flex flex-column align-items-start">
              {selectedTab === "General"
                ? Object.keys(TRANSPORTS).map((transportType) => (
                    <div
                      key={transportType}
                      className="d-flex align-items-center mb-3"
                    >
                      <img
                        src={TRANSPORTS[transportType][0].icon}
                        alt={`${transportType} icon`}
                        className="custom-transport-icon"
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedTab(transportType)}
                      />
                      <div className="d-flex flex-row flex-wrap">
                        {TRANSPORTS[transportType].slice(1).map((line) => (
                          <button
                            key={line.name}
                            className={`line-button ${
                              selectedLine?.name === line.name ? "selected-line" : ""
                            }`}
                            onClick={() => handleLineClick(transportType, line)}
                          >
                            <img
                              src={line.icon}
                              alt={`${line.name} icon`}
                              className="line-icon"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                : (
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={TRANSPORTS[selectedTab][0].icon}
                      alt={`${selectedTab} icon`}
                      className="custom-transport-icon"
                    />
                    <div className="d-flex flex-row flex-wrap">
                      {TRANSPORTS[selectedTab].slice(1).map((line) => (
                        <button
                          key={line.name}
                          className={`line-button ${
                            selectedLine?.name === line.name ? "selected-line" : ""
                          }`}
                          onClick={() => handleLineClick(selectedTab, line)}
                        >
                          <img
                            src={line.icon}
                            alt={`${line.name} icon`}
                            className="line-icon"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>

          {shouldShowPanel && (
            <div className="full-width-panel bg-light p-4 mt-4 shadow rounded">
              <div className="d-flex justify-content-start mb-3">
                <button
                  className={`btn me-3 ${
                    sideView === "line" ? "btn-danger text-white" : "btn-outline-danger"
                  }`}
                  onClick={() => setSideView("line")}
                >
                  Informations sur la ligne
                </button>
                <button
                  className={`btn ${
                    sideView === "traffic" ? "btn-danger text-white" : "btn-outline-danger"
                  }`}
                  onClick={() => setSideView("traffic")}
                >
                  Infos trafic
                </button>
              </div>

              <div className="side-content">
                {sideView === "line" && lineDetails && (
                  <div className="line-details-container">
                    {/* En-tête avec icône et nom */}
                    <div className="line-header mb-4">
                      <div className="d-flex align-items-center">
                        <img 
                          src={TRANSPORTS[selectedLine.type][0].icon} 
                          alt={lineDetails.transportType} 
                          className="me-3"
                          style={{ width: '40px' }}
                        />
                        <div>
                          <h3 className="mb-0">
                            {lineDetails.transportType} - Ligne {selectedLine.name}
                          </h3>
                          {lineDetails.name && <p className="text-muted mb-0">{lineDetails.name}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {lineDetails.description && (
                      <div className="line-info-section mb-4">
                        <h5 className="section-title mb-3">Description</h5>
                        <p className="line-description">{lineDetails.description}</p>
                      </div>
                    )}

                    {/* Stations */}
                    {lineDetails.stations && lineDetails.stations.length > 0 && (
                      <div className="stations-section">
                        <h5 className="section-title mb-3">Stations</h5>
                        <div className="stations-grid">
                          {lineDetails.stations.map((station, index) => (
                            <div key={index} className="station-item bg-light p-2 rounded mb-2">
                              <span className="station-bullet me-2">•</span>
                              {station}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {sideView === "line" && !lineDetails && (
                  <div className="alert alert-warning">
                    Informations non disponibles pour cette ligne.
                  </div>
                )}
                {sideView === "traffic" && (
                  <div>
                    <h5>État du trafic - Ligne {selectedLine.name}</h5>
                    <div className="alert alert-info">
                      Fonctionnalité à venir - Les informations trafic en temps réel seront affichées ici.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Traffic;
