import './AcceuilComponent.css';
import { listEmployees } from "../services/EmployeeService"; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import  { useState, useEffect } from "react";


function AcceuilComponent() {

  const [employeeCount, setEmployeeCount] = useState(0);

  // Récupérer le nombre d'employés dès le chargement du composant
  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployeeCount(response.length); // Nombre total d'employés
      })
      .catch(() => toast.error("Erreur lors de la récupération du nombre d'employés"));
  }, []);

  return (

    <div className="acceuil-container" style={{ marginLeft: '50px' }}>
      <ToastContainer />

      {/* Section présentation */}
      <br />
      <section className="about" style={{ marginLeft: '50px' }}>
        <h2>Bienvenue sur notre plateforme</h2>
        <p>
          Notre plateforme est conçue pour optimiser la gestion de vos employés, 
          simplifier la productivité et offrir des outils puissants pour atteindre vos objectifs.
        </p>
      </section>

       {/* Titre de la page */}
      <h2 className="my-4 text-center">Tableau de Bord</h2>

      {/* Conteneur pour les statistiques principales */}
      <div className="row" style={{ marginLeft: '50px' }}>
        {/* Statistique : Nombre d'employés */}
        <div className="col-lg-3 col-md-5 mb-4" style={{ marginLeft: '75px' }}>
          <div className="card shadow-sm card-custom-employees">
            <div className="card-body">
              <h5 className="card-title text-center">Nombre total d employés</h5>
              <p className="card-text fs-3 fw-bold text-center">{employeeCount}</p>
            </div>
          </div>
        </div>

        {/* Autres statistiques */}
        <div className="col-lg-3 col-md-5 mb-4">
          <div className="card shadow-sm card-custom-projects">
            <div className="card-body">
              <h5 className="card-title text-center">Projets en cours</h5>
              <p className="card-text fs-3 fw-bold text-center">00</p> {/* Exemple statique */}
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-5 mb-3">
          <div className="card shadow-sm card-custom-tasks">
            <div className="card-body">
              <h5 className="card-title text-center">Nouvelles tâches</h5>
              <p className="card-text fs-3 fw-bold text-center">00</p> {/* Exemple statique */}
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 mb-3">
          <div className="card shadow-sm card-custom-messages">
            <div className="card-body">
              <h5 className="card-title text-center">Messages non lus</h5>
              <p className="card-text fs-3 fw-bold text-center">00</p> {/* Exemple statique */}
            </div>
          </div>
        </div>
      </div>

      {/* Section fonctionnalités */}
      <section className="features" style={{ marginLeft: '55px' }}>
        <h2>Nos fonctionnalités</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <i className="fas fa-users"></i>
            <h3>Gestion des Employés</h3>
            <p>Ajoutez, modifiez et suivez les informations sur vos employés facilement.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-chart-line"></i>
            <h3>Suivi des Performances</h3>
            <p>Accédez à des tableaux de bord pour analyser les performances de vos équipes.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-cogs"></i>
            <h3>Paramètres Personnalisés</h3>
            <p>Personnalisez la plateforme pour répondre à vos besoins spécifiques.</p>
          </div>
        </div>
      </section>


    </div>
  );
}

export default AcceuilComponent;
