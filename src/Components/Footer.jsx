import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
import  styles from "./Footer.module.css";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <ul className="list-unstyled">
              <li>
                <Link to="/Itineraires">
                  Itinéraire
                </Link>
              </li>
              <li>
                <Link to="/Bilan_carbone">
                  Bilan carbone
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6 text-md-end">
            <p>Nous suivre</p>
            <div>
              <a href="#" className="mx-2">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="mx-2">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="mx-2">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
