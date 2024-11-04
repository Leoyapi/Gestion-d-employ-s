import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

// Fonction pour lister les employés avec authentification
export const listEmployees = async (token) => {
    try {
        const response = await axios.get(REST_API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Liste d'employés non trouvées:", error);
        throw error;
    }
};

// Fonction pour ajouter un employé avec authentification par jeton
export const addEmployee = async (employee, token) => {
    try {
        const response = await axios.post(REST_API_BASE_URL, employee, {
            headers: {
                Authorization: `Bearer ${token}` // Utilisation du token pour l'authentification
            }
        });
        console.log("Employé ajouté avec succès:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'employé:", error);
        throw error; 
    }
};


// Fonction pour récupérer un employé par son ID avec authentification par jeton
export const getEmployeeById = async (employeeId, token) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/${employeeId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Utilisation du token pour l'authentification
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'employé:", error);
        throw error;
    }
};


// Fonction pour mettre à jour un employé existant avec authentification par jeton
export const updateEmployee = async (employeeId, employee, token) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/${employeeId}`, employee, {
            headers: {
                Authorization: `Bearer ${token}` 
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
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de l'employé:", error);
        throw error;
    }
};




