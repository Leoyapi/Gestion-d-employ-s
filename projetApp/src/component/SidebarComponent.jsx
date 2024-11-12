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
          className="sidebar d-flex flex-column flex-shrink-0 p-4"
          style={{
            backgroundColor: '#34495e',  // Couleur de fond plus douce et élégante
            color: '#ecf0f1',  // Texte clair
            width: '250px',
            height: '100vh', 
            position: 'fixed',
            zIndex: '1000',
            transition: 'transform 0.3s ease', 
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',  // Ombre subtile pour le côté flottant
            overflowY: 'auto', // Permet de défiler si la sidebar est trop longue
          }}
        >
          {/* Bouton pour fermer la sidebar */}
          <button 
            onClick={toggleSidebar} 
            className="btn btn-outline-light mb-4" 
            style={{
              border: 'none', 
              background: 'transparent', 
              fontSize: '24px',
              color: '#ecf0f1'
            }}
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Titre de la sidebar */}
          <h4 className="text-center mb-4" style={{ fontSize: '22px', fontWeight: '600' }}>Menu</h4>

          {/* Liste de navigation */}
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a
                href="/acceuil"
                className={`nav-link ${isActive('/acceuil') ? 'active' : ''}`}
                aria-current="page"
                style={{ padding: '12px 20px', borderRadius: '5px', color: '#ecf0f1', transition: 'background-color 0.2s ease' }}
              >
                <i className="fas fa-home"></i> Accueil
              </a>
            </li>
            <li>
              <a
                href="/employees"
                className={`nav-link ${isActive('/employees') ? 'active' : ''}`}
                style={{ padding: '12px 20px', borderRadius: '5px', color: '#ecf0f1', transition: 'background-color 0.2s ease' }}
              >
                <i className="fas fa-users"></i> Liste employée
              </a>
            </li>
            <li>
              <a
                href="/departments"
                className={`nav-link ${isActive('/departments') ? 'active' : ''}`}
                style={{ padding: '12px 20px', borderRadius: '5px', color: '#ecf0f1', transition: 'background-color 0.2s ease' }}
              >
                <i className="fas fa-building"></i> Département
              </a>
            </li>
            <li>
              <a
                href="/leave"
                className={`nav-link ${isActive('/leave') ? 'active' : ''}`}
                style={{ padding: '12px 20px', borderRadius: '5px', color: '#ecf0f1', transition: 'background-color 0.2s ease' }}
              >
                <i className="fas fa-calendar-day"></i> Congé
              </a>
            </li>

            {/* Sous-menu Paramètres */}
            <li>
              <a
                href="#"
                className="nav-link text-white"
                onClick={toggleSubMenu}
                style={{ cursor: 'pointer', padding: '12px 20px', borderRadius: '5px', transition: 'background-color 0.2s ease' }}
              >
                <i className="fas fa-cog"></i> Paramètres
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} ms-2`}></i>
              </a>
              {isOpen && (
                <ul className="nav flex-column ms-3">
                  <li className="nav-item">
                    <a
                      href="/profile"
                      className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                      style={{ padding: '10px 20px', borderRadius: '5px', color: '#ecf0f1' }}
                    >
                      <i className="fas fa-user-circle"></i> Profil
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/preferences"
                      className={`nav-link ${isActive('/preferences') ? 'active' : ''}`}
                      style={{ padding: '10px 20px', borderRadius: '5px', color: '#ecf0f1' }}
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

      {/* Bouton pour afficher la sidebar lorsqu'elle est cachée */}
      {!isSidebarVisible && (
        <button
          onClick={toggleSidebar}
          className="btn btn-secondary"
          style={{
            position: 'fixed', 
            left: '10px', 
            top: '10px', 
            zIndex: '1001',
            fontSize: '30px', 
            backgroundColor: '#34495e',
            color: '#ecf0f1',
            border: 'none',
            padding: '10px',
            borderRadius: '5px'
          }}
        >
          <i className="fas fa-bars"></i>
        </button>
      )}
    </>
  );
}

export default SidebarComponent;
