import { useLocation, Link, useNavigate } from 'react-router-dom';
import { getToken, logoutUser } from '../services/UserService';

function HeaderComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = getToken();
  const username = localStorage.getItem('username');

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem('username');
    navigate("/login"); 
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="/acceuil" style={{ marginLeft: '75px' }}>
            <h4>Système de gestion des employés</h4>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {token ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link" style={{ marginRight: '10px' }}>
                      <i className="fa-solid fa-circle-user" style={{ color: 'green', marginRight: '7px' }}></i>
                      Hello, {username} 
                    </span>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i> Déconnexion
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/register" className={`nav-link ${isActive('/register') ? 'active' : ''}`}>
                      <i className="fas fa-user-plus"></i> Inscription
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`}>
                      <i className="fas fa-sign-in-alt"></i> Connexion
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;
