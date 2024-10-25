import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../services/EmployeeService";

function EmployeeComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const navigate = useNavigate();

  function saveEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      addEmployee(employee).then((response) => {
        console.log(response.data);
        navigate("/employees");
      }).catch((error) => {
        console.error("Erreur lors de l'ajout de l'employé", error);
      });
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'Le nom est obligatoire';
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Le prénom est obligatoire';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = "L'email est obligatoire";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid; // Retourne une valeur pour indiquer si le formulaire est valide
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">Ajouter un nouvel employé</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="label-form">Nom:</label>
                <input
                  type="text"
                  placeholder="Entrez votre nom"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="label-form">Prénom:</label>
                <input
                  type="text"
                  placeholder="Entrez votre prénom"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="label-form">Email:</label>
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <button className="btn btn-success" onClick={saveEmployee}>
                Sauvegarder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeComponent;
