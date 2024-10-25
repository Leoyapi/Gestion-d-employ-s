import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

// Fonction pour lister les employés
export const listEmployees = async () => {
    try {
        const response = await axios.get(REST_API_BASE_URL, {
            auth: {
                username: '',
                password: ''
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des employés:", error);
        throw error; 
    }
};
// Fonction pour ajouter un employé 
export const addEmployee = async (employee) => {
    try {
        const response = await axios.post(REST_API_BASE_URL, employee, {
            auth: {
                username: '',
                password: ''
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'employé:", error);
        throw error; // Rejeter l'erreur pour une gestion ultérieure si nécessaire
    }
};


// Fonction pour récupérer un employé par son ID
export const getEmployeeById = async (employeeId) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/${employeeId}`, {
            auth: {
                username: '',
                password: ''
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'employé:", error);
        throw error;
    }
};

// Fonction pour mettre à jour un employé existant
export const updateEmployee = async (employeeId, employee) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/${employeeId}`, employee, {
            auth: {
                username: '',
                password: ''
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'employé:", error);
        throw error;
    }
};

// Fonction pour supprimer un employé
export const deleteEmployee = async (employeeId, token) => {
    try {
        const response = await axios.delete(`${REST_API_BASE_URL}/${employeeId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Utilisation du token pour l'authentification
            }
        });
        console.log("Employé supprimé avec succès:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de l'employé:", error);
        throw error;
    }
};




