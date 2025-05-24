import { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Importation des icônes des lignes de transport
import rerIcon from '/Images/Paris_transit_icons_-_RER.svg.png'; 
import metroIcon from '/Images/Paris_transit_icons_-_Métro.svg.png'; 
import tramIcon from '/Images/Paris_transit_icons_-_Tram.svg.png'; 
import transilienIcon from '/Images/Paris_transit_icons_-_Train.svg.png'; 

// Importation des icônes pour chaque ligne
import lineRERAIcon from '/Images/Paris_transit_icons_-_RER_A.svg.png';
import lineRERBIcon from '/Images/Paris_transit_icons_-_RER_B.svg.png';
import lineRERCIcon from '/Images/Paris_transit_icons_-_RER_C.svg.png';
import lineRERDIcon from '/Images/Paris_transit_icons_-_RER_D.svg.png';
import lineREREIcon from '/Images/Paris_transit_icons_-_RER_E.svg.png';
import lineM1Icon from '/Images/Paris_transit_icons_-_Métro_1.svg.png';
import lineM2Icon from '/Images/Paris_transit_icons_-_Métro_2.svg.png';
import lineM3bisIcon from '/Images/Paris_transit_icons_-_Métro_3bis.svg.png';
import lineM4Icon from '/Images/Paris_transit_icons_-_Métro_4.svg.png';
import lineM5Icon from '/Images/Paris_transit_icons_-_Métro_5.svg.png';
import lineM6Icon from '/Images/Paris_transit_icons_-_Métro_6.svg.png';
import lineM7Icon from '/Images/Paris_transit_icons_-_Métro_7.svg.png';
import lineM8Icon from '/Images/Paris_transit_icons_-_Métro_8.svg.png';
import lineM9Icon from '/Images/Paris_transit_icons_-_Métro_9.svg.png';
import lineM10Icon from '/Images/Paris_transit_icons_-_Métro_10.svg.png';
import lineM11Icon from '/Images/Paris_transit_icons_-_Métro_11.svg.png';
import lineM12Icon from '/Images/Paris_transit_icons_-_Métro_12.svg.png';
import lineM13Icon from '/Images/Paris_transit_icons_-_Métro_13.svg.png';
import lineM14Icon from '/Images/Paris_transit_icons_-_Métro_14.svg.png';
import lineT1Icon from '/Images/Paris_transit_icons_-_Tram_1.svg.png'; 
import lineT2Icon from '/Images/Paris_transit_icons_-_Tram_2.svg.png'; 
import lineT3aIcon from '/Images/Paris_transit_icons_-_Tram_3a.svg.png'; 
import lineT3bIcon from '/Images/Paris_transit_icons_-_Tram_3b.svg.png'; 
import lineT4Icon from '/Images/Paris_transit_icons_-_Tram_4.svg.png'; 
import lineT5Icon from '/Images/Paris_transit_icons_-_Tram_5.svg.png'; 
import lineT6Icon from '/Images/Paris_transit_icons_-_Tram_6.svg.png'; 
import lineT7Icon from '/Images/Paris_transit_icons_-_Tram_7.svg.png'; 
import lineT8Icon from '/Images/Paris_transit_icons_-_Tram_8.svg.png'; 
import lineT9Icon from '/Images/Paris_transit_icons_-_Tram_9.svg.png'; 
import lineT10Icon from '/Images/Paris_transit_icons_-_Tram_10.svg.png'; 
import lineT11Icon from '/Images/Paris_transit_icons_-_Tram_11.svg.png'; 
import lineT12Icon from '/Images/Paris_transit_icons_-_Tram_12.svg.png'; 
import lineT13Icon from '/Images/Paris_transit_icons_-_Tram_13.svg.png'; 
import lineT14Icon from '/Images/Paris_transit_icons_-_Tram_14.svg.png'; 
import lineHIcon from '/Images/Paris_transit_icons_-_Train_H.svg.png';
import lineJIcon from '/Images/Paris_transit_icons_-_Train_J.svg.png';
import lineKIcon from '/Images/Paris_transit_icons_-_Train_K.svg.png';
import lineLIcon from '/Images/Paris_transit_icons_-_Train_L.svg.png';
import lineNIcon from '/Images/Paris_transit_icons_-_Train_N.svg.png';
import linePIcon from '/Images/Paris_transit_icons_-_Train_P.svg.png';
import lineRIcon from '/Images/Paris_transit_icons_-_Train_R.svg.png';
import lineUIcon from '/Images/Paris_transit_icons_-_Train_U.svg.png';
import lineVIcon from '/Images/Paris_transit_icons_-_Train_V.svg.png';
import clockIcon from '/Images/refresh.png'; 

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
  const [selectedTab, setSelectedTab] = useState("General"); // Valeur par défaut
  const [currentTime, setCurrentTime] = useState(""); // État pour l'heure actuelle

  // Fonction pour mettre à jour l'heure actuelle
  const updateCurrentTime = () => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    setCurrentTime(now.toLocaleTimeString([], options));
  };

  return (
    <div className="traffic-page-container">
      <Header />
      <main className="content mt-5"> 
        <div className="p-4">
          <div className="bg-danger rounded-top p-2 d-flex justify-content-between">
            <button
              onClick={() => setSelectedTab("General")}
              className={`traffic-btn ${selectedTab === "General" ? "btn-danger text-white border-bottom border-white" : "btn-danger text-white"} me-2`}
            >
              Vue générale
            </button>
            {Object.keys(TRANSPORTS).map((transportType) => (
              <button
                key={transportType}
                onClick={() => setSelectedTab(transportType)}
                className={`traffic-btn ${selectedTab === transportType ? "btn-danger text-white border-bottom border-white" : "btn-danger text-white"} me-2`}
              >
                {transportType}
              </button>
            ))}
          </div>
          <div className="traffic-block">
            <h5 className="mb-3 d-flex align-items-center">
              {selectedTab === "General" && (
                <img 
                  src={clockIcon} 
                  alt="Clock Icon" 
                  style={{ width: '30px', height: '30px', marginRight: '10px', cursor: 'pointer' }} 
                  onClick={() => {
                    updateCurrentTime();
                    // Ici, vous pouvez également appeler l'API pour obtenir des informations en temps réel
                  }} 
                />
              )}
              {selectedTab === "General" ? (
                `Un œil sur le trafic${currentTime ? ` à ${currentTime}` : ''}`
              ) : (
                `Sélectionner une ligne`
              )}
            </h5>
            <div className="d-flex flex-column align-items-start">
              {selectedTab === "General" ? (
                // Affichage de toutes les icônes des moyens de transport avec leurs lignes
                Object.keys(TRANSPORTS).map((transportType) => (
                  <div key={transportType} className="d-flex align-items-center mb-3">
                    <img src={TRANSPORTS[transportType][0].icon} alt={`${transportType} icon`} className="custom-transport-icon" />
                    <div className="d-flex flex-row">
                      {TRANSPORTS[transportType].slice(1).map((line) => (
                        <button key={line.name} className="line-button">
                          <img src={line.icon} alt={`${line.name} icon`} className="line-icon" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // Affichage des lignes pour le moyen de transport sélectionné
                <div className="d-flex align-items-center mb-3">
                  <img src={TRANSPORTS[selectedTab][0].icon} alt={`${selectedTab} icon`} className="custom-transport-icon" />
                  <div className="d-flex flex-row">
                    {TRANSPORTS[selectedTab].slice(1).map((line) => (
                      <button key={line.name} className="line-button">
                        <img src={line.icon} alt={`${line.name} icon`} className="line-icon" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Traffic;
