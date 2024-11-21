import { useEffect, useState } from "react";
import { listEmployees, addEmployee, updateEmployee, deleteEmployee } from "../services/EmployeeService";
import { getAllDepartments }  from "../services/DepartmentService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ListEmployeeComponent = () => {

    // État pour stocker la liste des employés
  const [employees, setEmployees] = useState([]);
    // État pour contrôler l'affichage de la fenêtre modale
  const [showModal, setShowModal] = useState(false);
  // État pour afficher la modale de suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  // État pour gérer le mode édition (ajout ou modification)
  const [editMode, setEditMode] = useState(false);
    // État pour stocker l'employé actuel lors de l'édition
  const [currentEmployee, setCurrentEmployee] = useState(null);

    // État pour stocker les données de l'employé à ajouter ou à éditer
  const [employeeData, setEmployeeData] = useState({ firstName: '', lastName: '',departmentId: '', email: '' });
    // État pour stocker un message de succès après une opération réussie

  const [employeeToDelete, setEmployeeToDelete] = useState(null); 

  const [departments, setDepartments] = useState([]); // New state for departments


    // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const employeesPerPage = 11; // Afficher 11 employés par page

  useEffect(() => {
    // Récupérer la liste des départements et des employés
    Promise.all([listEmployees(), getAllDepartments()])
      .then(([employeesResponse, departmentsResponse]) => {
        // Tri des employés par ID décroissant
        const sortedEmployees = employeesResponse.sort((a, b) => b.id - a.id);
  
        // Associer chaque employé à son département
        const employeesWithDepartments = sortedEmployees.map((employee) => {
          // Trouver le département correspondant à l'ID du département
          const department = departmentsResponse.find((dept) => dept.id === employee.departmentId);
          return {
            ...employee,
            departmentName: department ? department.name : 'Non assigné',
          };
        });
  
        // Mettre à jour l'état des employés avec les départements associés
        setEmployees(employeesWithDepartments);
        // Mettre à jour l'état des départements
        setDepartments(departmentsResponse);
      })
      .catch(() => {
        toast.error("Erreur de récupération des employés ou des départements");
      });
  }, []);  // Ce useEffect se déclenche une seule fois, lors du premier rendu du composant
  

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Récupérer le nom et la valeur du champ modifié
    setEmployeeData({ ...employeeData, [name]: value }); // Mettre à jour l'état des données de l'employé
  };

    // Fonction pour changer de page
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  // Pagination logic: calculate employees for the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

// Fonction pour enregistrer un nouvel employé
const saveNewEmployee = (e) => {
  e.preventDefault();

  addEmployee(employeeData)
      .then(() => {
          setShowModal(false);
          setEmployeeData({ firstName: '', lastName: '', departmentId: '', email: '' });
          toast.success("L'employé a été ajouté avec succès.");

          return listEmployees(); // Récupérer à nouveau la liste des employés après l'ajout
      })        
      .then((response) => {
          // Trier les employés par ID décroissant
          const sortedEmployees = response.sort((a, b) => b.id - a.id);

          // Associer les employés à leurs départements respectifs
          const employeesWithDepartments = sortedEmployees.map((employee) => {
              const department = departments.find((dept) => dept.id === employee.departmentId);
              return {
                  ...employee,
                  departmentName: department ? department.name : 'Non assigné', // Si le département est trouvé, assigner son nom
              };
          });

          // Mettre à jour l'état des employés avec les départements associés
          setEmployees(employeesWithDepartments);
      })
      .catch((err) => {
          console.error("Erreur lors de l'enregistrement:", err);

          if (err.response && err.response.data && err.response.data.message) {
              toast.error(err.response.data.message);
          } else {
              toast.error("Erreur, votre email existe déjà.");
          }
      });
};

  // Fonction pour ouvrir la fenêtre modale en mode édition
  const handleEdit = (employee) => {  
    setCurrentEmployee(employee); // Stocker l'employé actuel pour l'édition
    setEmployeeData({ firstName: employee.firstName, lastName: employee.lastName,email: employee.email }); // Pré-remplir le formulaire
    setEditMode(true); // Activer le mode édition
    setShowModal(true); // Ouvrir la fenêtre modale
  };

  const saveEditedEmployee = (e) => {
    e.preventDefault();
    updateEmployee(currentEmployee.id, employeeData) // Mettre à jour l'employé avec les données actuelles
        .then(() => {
            setShowModal(false);
            setEditMode(false);
            toast.success("L'employé a été modifié avec succès."); 

            return listEmployees(); // Récupérer à nouveau la liste des employés après modification
        })
        .then((response) => {
            // Trier les employés par ID décroissant
            const sortedEmployees = response.sort((a, b) => b.id - a.id);

            // Associer les employés à leurs départements respectifs
            const employeesWithDepartments = sortedEmployees.map((employee) => {
                const department = departments.find((dept) => dept.id === employee.departmentId);
                return {
                    ...employee,
                    departmentName: department ? department.name : 'Non assigné', // Si le département est trouvé, assigner son nom
                };
            });

            // Mettre à jour l'état des employés avec les départements associés
            setEmployees(employeesWithDepartments);
        })
        .catch((err) => {
            console.error("Erreur lors de la modification:", err);
            toast.error("Une erreur s'est produite lors de la modification de l'employé.");
        });
};

  // Ouvrir la modale de suppression
  const handleDeleteClick = (employeeId) => {
    setEmployeeToDelete(employeeId); // Stocke l'employé à supprimer
    setShowDeleteModal(true); // Affiche la modale de confirmation
  };

  // Supprimer un employé après confirmation
  const confirmDelete = () => {
    deleteEmployee(employeeToDelete)
        .then(() => {
            toast.success("L'employé a été supprimé avec succès."); 
            setShowDeleteModal(false);
            return listEmployees();
        })
        .then((response) => {
            const sortedEmployees = response.sort((a, b) => b.id - a.id);
            setEmployees(sortedEmployees);
        })
        .catch((err) => {
            console.error("Erreur lors de la suppression:", err);
            toast.error("Une erreur s'est produite lors de la suppression de l'employé."); 
        });
};

  return (

   <div className="container-fluid">
      <br /> <br /><br /><br />
  <div className="container">

  {/* Title for Employee List */}
  <h2 className="text-center mb-4">Liste des Employés</h2>

  <ToastContainer />

  {/* Button to Add New Employee */}
  <div className="mb-3">
    <button
      className="btn btn-primary"
      style={{ marginLeft: '70px' }} 
      onClick={() => {
        setShowModal(true);
        setEditMode(false);
        setEmployeeData({ firstName: '', lastName: '',departmentId: '', email: '' });
      }}
    >
      <i className="fa-solid fa-plus"></i> Nouveau
    </button>
  </div>
    {/* Employee Table */}
    <div className="table-container" style={{ width: '114%', margin: '0 auto' }}>
      <table
        className="table table-striped table-bordered"
        style={{
          margin: '0 auto',
          width: '91%',
        }}
      >
        <thead style={{ position: 'sticky', top: '0', backgroundColor: '#fff', zIndex: '1' }}>
          <tr>
            <th className="text-center">N°</th>
            <th className="text-center">Nom</th>
            <th className="text-center">Prénom</th>
            <th className="text-center">Département</th>
            <th className="text-center">Email</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((employee, index) => (
              <tr key={employee.id} className="table-row">
                <td className="text-center">{indexOfFirstEmployee + index + 1}</td>
                <td className="text-center">{employee.firstName}</td>
                <td className="text-center">{employee.lastName}</td>
                <td className="text-center">{employee.departmentName || 'Non assigné'}</td>
                <td className="text-center">{employee.email}</td>
                <td className="text-center">
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(employee)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(employee.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">Aucun employé trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

            {/* Pagination */}
      <div className="pagination justify-content-center mt-3">
        {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }, (_, i) => (
          <button
            key={i + 1}
            className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'} me-1`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>


      {/* Modale de suppression */}
      {showDeleteModal && (
        <div className="modal show d-block custom-modal-overlay" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation de suppression</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                Êtes-vous sûr de vouloir supprimer cet employé ?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Annuler</button>
                <button className="btn btn-danger" onClick={confirmDelete}>Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}

     {/* Modale d'ajout/édition */}
      
      {showModal && (
        <div className="modal show d-block custom-modal-overlay" tabIndex="-1" >
          <div className="modal-dialog modal-dialog-centered" >
            <div className="modal-content">
              <div className="modal-header" >
                <h5 className="modal-title">{editMode ? 'Modifier un employé' : 'Ajouter un nouvel employé'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body" >
                <form onSubmit={editMode ? saveEditedEmployee : saveNewEmployee} >
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={employeeData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Prénom</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={employeeData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                  <label className="form-label">Département</label>
                  <select
                    name="departmentId"
                    className="form-control"
                    value={employeeData.departmentId || ''}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Sélectionner un département</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={employeeData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div> 
                  <div className="modal-footer">
                    <button type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}>
                      Fermer
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editMode ? 'Mettre à jour' : 'Ajouter'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
</div>


);
};

export default ListEmployeeComponent;
