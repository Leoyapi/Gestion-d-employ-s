import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap CSS
import { registerUser } from '../services/UserService'; 
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
function RegisterComponent() {
  // Initialisation du state pour stocker les informations de l'utilisateur
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // Gestion des changements dans les champs de saisie (input)
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(user);
      console.log("Réponse de l'API :", response); // Vérifiez ici
      toast.success('Inscription réussie ! Redirection en cours...'); // Afficher un toast de succès

      // Redirection vers une autre page après réussite
      setTimeout(() => navigate("/login"), 2000); 
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      // Vérifiez l'objet d'erreur
      if (error.response) {
        console.log("Détails de l'erreur :", error.response); // Détails supplémentaires
        toast.error(error.response.data.message || "Une erreur est survenue lors de l'inscription. Vérifiez vos informations et réessayez."); // Afficher un toast d'erreur
      } else if (error.request) {
        toast.error("Aucune réponse reçue du serveur. Veuillez réessayer plus tard."); // Afficher un toast d'erreur
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer."); // Afficher un toast d'erreur
      }
    }
  };

  return (
    <div className="container" style={{ width: '50%' }}>
      <br />
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">Inscription</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <label htmlFor="username" className="form-label">Nom d utilisateur</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Entrez votre nom d'utilisateur"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Entrez votre email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <center><button type="submit" className="btn btn-success w-50">S inscrire</button></center>
            <br />
          </form>
        </div>
      </div>
      <ToastContainer /> {/* Ajouter le composant ToastContainer ici */}
    </div>
  );
}

export default RegisterComponent;
