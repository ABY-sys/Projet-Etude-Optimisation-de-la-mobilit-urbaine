import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="bg-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <ul className="list-unstyled">
                <li><Link to="/Itineraires" className="text-decoration-none text-dark">Itinéraire</Link></li>
                <li><Link to="/Bilan_carbone" className="text-decoration-none text-dark">Bilan carbone</Link></li>
              </ul>
            </div>
            <div className="col-12 col-md-6 text-md-end">
              <p className="text-dark mb-2">Nous suivre</p>
              <div>
                <a href="#" className="text-dark mx-2">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-dark mx-2">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-dark mx-2">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  