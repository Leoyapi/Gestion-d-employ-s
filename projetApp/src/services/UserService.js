import axios from "axios";

// Définir l'URL de base pour l'API
const API_BASE_URL = 'http://localhost:8080/api';

// Fonction pour récupérer le token
export const getToken = () => {
    return localStorage.getItem('token'); // Retourner le token pour utilisation
};

// Ajouter un intercepteur pour inclure le jeton dans les en-têtes des requêtes
axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Ajouter le jeton aux en-têtes
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Rejeter les erreurs de configuration
    }
);

// Fonction pour enregistrer un nouvel utilisateur
export const registerUser = async (user) => {
    // Validation des données
    if (!user.email || !user.password) {
        return;
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/register`, user);
        console.log("Réponse de l'inscription :", response.data);

        // Vérifiez si la réponse contient un id pour confirmer le succès de l'inscription
        if (response.data.id) {
            return response.data; // Retourner la réponse pour un usage ultérieur
        } else {
            throw new Error('Erreur lors de l\'inscription.');
        }
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error.response?.data || error);
        const message = error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
        return Promise.reject({ message }); // Rejeter l'erreur avec le message
    }
};

// Fonction pour récupérer tous les utilisateurs
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`); // Assurez-vous que l'URL correspond à votre API
        return response.data; // Retourne la liste des utilisateurs
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error.response?.data || error);
        const message = error.response?.data?.message || 'Une erreur est survenue lors de la récupération des utilisateurs. Veuillez réessayer.';
        return Promise.reject({ message }); // Rejeter l'erreur avec le message
    }
};

// Fonction pour récupérer un utilisateur par ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${id}`);
        return response.data; // Retourne les données de l'utilisateur
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        throw error; // Gère l'erreur selon tes besoins
    }
};

// Fonction pour récupérer le nom d'utilisateur à partir du token
export const getUsername = () => {
    const token = getToken();
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log("Payload du token:", payload); // Vérifie le contenu du payload
        return payload.username; // Assure-toi que "username" est bien présent
    }
    return null;
};



// Fonction pour la connexion
export const loginUser = async (user) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email || !emailRegex.test(user.email)) {
        return Promise.reject({ message: "Veuillez entrer un email valide." });
    }

    if (!user.password) {
        return Promise.reject({ message: "Veuillez entrer un mot de passe." });
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/login`, user);
        
        // Vérifie si la réponse contient un token et un nom d'utilisateur
        if (response?.data?.token) {
            localStorage.setItem('token', response.data.token); // Enregistre le token
            localStorage.setItem('username', response.data.username); // Enregistre le nom d'utilisateur
            return response.data; // Retourne les données, incluant le nom d'utilisateur
        } else {
            return Promise.reject({ message: 'Une erreur est survenue lors de la connexion.' });
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        let message = 'Identifiants invalides.';
        if (error.response) {
            message = error.response.data?.message || message;
        } else if (error.request) {
            message = 'Aucune réponse du serveur. Vérifiez votre connexion réseau.';
        } else {
            message = 'Erreur de connexion. Veuillez réessayer.';
        }
        return Promise.reject({ message }); // Retourne un rejet avec un message d'erreur
    }
};



// Fonction pour se déconnecter
export const logoutUser = () => {
    localStorage.removeItem('token');
};
