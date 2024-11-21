import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
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
  e.preventDefault(); // Empêche le rechargement de la page

  // Validation basique (si nécessaire)
  if (!user.username || !user.email || !user.password) {
    toast.error("Veuillez remplir tous les champs.");
    return;
  }

  try {
    const response = await registerUser(user); // Appel à la fonction d'enregistrement
    console.log("Réponse de l'API :", response);
    toast.success('Inscription réussie ! Redirection en cours...');

    // Redirection après un délai pour que l'utilisateur puisse voir le message
    setTimeout(() => navigate("/login"), 2000);
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    const message = error.response?.data?.message || "Une erreur est survenue lors de l'inscription.";
    toast.error(message); // Affiche un message d'erreur
  }
};



  return (
    <div className="container" style={{ width: '50%' }}>
      <br />
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
      <ToastContainer /> {/* le composant ToastContainer  */}
    </div>
  );
}

export default RegisterComponent;
