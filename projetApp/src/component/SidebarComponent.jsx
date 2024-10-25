import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function SidebarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const location = useLocation(); 

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Fonction pour vérifier si le chemin correspond à l'URL actuelle
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isSidebarVisible && (
        <div
          className="sidebar d-flex flex-column flex-shrink-0 p-3"
          style={{
            backgroundColor: '#4b4c4d',
            color: '#ffffff',
            width: '220px',
            height: 'calc(100vh - 10px)', 
            position: 'fixed',
            zIndex: '1000',
            transition: 'transform 0.3s ease', 
          }}
        >
          <button onClick={toggleSidebar} className="btn btn-outline-light mb-1">
            <i className="fas fa-times"></i> {/* Icône pour masquer le menu */}
          </button>
          <br /><br /><br />
          <h4 className="text-center mb-4">Menu</h4>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a
                href="/acceuil"
                className={`nav-link ${isActive('/acceuil') ? 'active' : 'text-white'}`}
                aria-current="page"
              >
                <i className="fas fa-home"></i> Accueil
              </a>
            </li>
            <li>
              <a
                href="/employees"
                className={`nav-link ${isActive('/employees') ? 'active' : 'text-white'}`}
              >
                <i className="fa-solid fa-list"></i> Liste employée
              </a>
            </li>
            {/* <li>
              <a
                href="/register"
                className={`nav-link ${isActive('/register') ? 'active' : 'text-white'}`}
              >
                <i className="fas fa-user-plus"></i> Inscription
              </a>
            </li>
            <li>
              <a
                href="/login"
                className={`nav-link ${isActive('/login') ? 'active' : 'text-white'}`}
              >
                <i className="fas fa-sign-in-alt"></i> Connexion
              </a>
            </li> */}
            <li>
              <a
                href="#"
                className="nav-link text-white"
                onClick={toggleSubMenu}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-cog"></i> Paramètres
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} ms-2`}></i>
              </a>
              {isOpen && (
                <ul className="nav nav-pills flex-column mb-auto ms-3">
                  <li className="nav-item">
                    <a
                      href="/profile"
                      className={`nav-link ${isActive('/profile') ? 'active' : 'text-white'}`}
                    >
                      <i className="fas fa-user-circle"></i> Profil
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/preferences"
                      className={`nav-link ${isActive('/preferences') ? 'active' : 'text-white'}`}
                    >
                      <i className="fas fa-sliders-h"></i> Préférences
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
      {!isSidebarVisible && (
        <button
          onClick={toggleSidebar}
          className="btn btn-secondary"
          style={{ position: 'fixed', left: '10px', top: '10px', zIndex: '1001' }}
        >
          <i className="fas fa-bars"></i> {/* Icône de menu pour afficher le menu */}
        </button>
      )}
    </>
  );
}

export default SidebarComponent;
