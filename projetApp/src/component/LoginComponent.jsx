import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from '../services/UserService'; 
import { ToastContainer, toast } from 'react-toastify'; 
import { Spinner } from 'react-bootstrap'; 
import 'react-toastify/dist/ReactToastify.css';

function LoginComponent() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(user);
      console.log("Connexion réussie:", response);
      setUser({ email: '', password: '' });
      toast.success('Connexion réussie !');
      navigate("/acceuil");
    } catch (error) {
      const message = error.response?.data?.message || "Une erreur s'est produite lors de la connexion.";
      toast.error(message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ width: '50%' }}>
      <br /><br /><br /><br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">Connexion</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
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

            <div className="mb-2">
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

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success w-47" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </button>
            </div>

            <div className="text-center mt-3">
              <p>Pas encore inscrit ? <Link to="/register">Inscrivez-vous ici</Link></p>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer /> {/* Affiche les notifications */}
    </div>
  );
}

export default LoginComponent;
