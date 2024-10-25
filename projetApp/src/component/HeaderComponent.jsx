import { useLocation } from 'react-router-dom';

function HeaderComponent() {
  const location = useLocation();

  // Fonction pour vérifier si un lien est actif
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
          <a className="navbar-brand" href="/" style={{ marginLeft: '50px' }}>
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
              <li className="nav-item">
                <a
                  href="/register"
                  className={`nav-link ${isActive('/register') ? 'active' : 'text-white'}`}
                >
                  <i className="fas fa-user-plus"></i> Inscription
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/login"
                  className={`nav-link ${isActive('/login') ? 'active' : 'text-white'}`}
                >
                  <i className="fas fa-sign-in-alt"></i> Connexion
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;
