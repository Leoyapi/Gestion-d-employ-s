import { useState, useEffect } from 'react';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from "../services/DepartmentService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal de confirmation de suppression
  const [departmentData, setDepartmentData] = useState({ name: '' });
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    getAllDepartments()
      .then((response) => {
        setDepartments(response);
      })
      .catch(() => toast.error('Erreur lors de la récupération des départements', { autoClose: 3000 }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData({ ...departmentData, [name]: value });
  };

  const handleAddDepartment = () => {
    createDepartment(departmentData)
      .then(() => {
        toast.success('Département ajouté avec succès', { autoClose: 3000 });
        fetchDepartments();
        setShowModal(false);
      })
      .catch(() => toast.error('Erreur lors de l\'ajout du département', { autoClose: 3000 }));
  };

  const handleEditDepartment = () => {
    updateDepartment(currentDepartment.id, departmentData)
      .then(() => {
        toast.success('Département mis à jour avec succès', { autoClose: 3000 });
        fetchDepartments();
        setShowModal(false);
      })
      .catch(() => toast.error('Erreur lors de la mise à jour du département', { autoClose: 3000 }));
  };

  const handleDeleteDepartment = (id) => {
    deleteDepartment(id)
      .then(() => {
        toast.success('Département supprimé avec succès', { autoClose: 3000 });
        fetchDepartments();
        setShowDeleteModal(false); // Fermer le modal de confirmation après la suppression
      })
      .catch(() => toast.error('Erreur lors de la suppression du département', { autoClose: 3000 }));
  };

  const openDeleteModal = (department) => {
    setCurrentDepartment(department);
    setShowDeleteModal(true); // Ouvrir le modal de confirmation
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false); // Fermer le modal de confirmation
  };

  return (
    <div className="container" style={{ width: '90%', margin: '0 auto' }}>
      <br /> <br /><br /><br />
      <h2 className="text-center mb-4">Liste des Départements</h2>
      <button onClick={() => { setShowModal(true); setEditMode(false); setDepartmentData({ name: '' }); }}
       className="btn btn-primary mb-3" style={{ marginLeft: '115px' }}>
        Ajouter un département
      </button>

      <table className="table" style={{ margin: '0 auto', width: '80%' }}>
        <thead style={{ position: 'sticky', top: '0', backgroundColor: '#fff', zIndex: '1' }}>
          <tr>
            <th>N°</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={department.id}>
              <td>{index + 1}</td>
              <td>{department.name}</td>
              <td>
                <button onClick={() => { setCurrentDepartment(department); setDepartmentData({ name: department.name }); setEditMode(true); setShowModal(true); }}
                 className="btn btn-warning btn-sm" >
                  Modifier
                </button>
                <button onClick={() => openDeleteModal(department)} className="btn btn-danger btn-sm ml-2">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour Ajouter ou Modifier le Département */}
      {showModal && (
        <div className="modal show d-block custom-modal-overlay" style={{ display: 'block' }} onClick={() => setShowModal(false)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editMode ? 'Modifier le département' : 'Ajouter un département'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); editMode ? handleEditDepartment() : handleAddDepartment(); }}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Nom du Département</label>
                    <input type="text" className="form-control" name="name" value={departmentData.name} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                  <button type="submit" className="btn btn-primary">{editMode ? 'Mettre à jour' : 'Ajouter'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="modal show d-block custom-modal-overlay" style={{ display: 'block' }} onClick={closeDeleteModal}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmer la suppression</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer ce département ? Cette action est irréversible.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Annuler</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteDepartment(currentDepartment.id)}>Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ToastContainer pour afficher les toasts */}
      <ToastContainer />
    </div>
  );
};

export default DepartmentComponent;
