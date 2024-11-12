import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/departments';

// Function to get all departments
export const getAllDepartments = async () => {
  try {
    const response = await axios.get(REST_API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

// Function to get a department by ID
export const getDepartmentById = async (id) => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching department with id ${id}:`, error);
    throw error;
  }
};

// Function to create a new department
export const createDepartment = async (department) => {
  try {
    const response = await axios.post(REST_API_BASE_URL, department);
    return response.data;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};

// Function to update an existing department
export const updateDepartment = async (id, department) => {
  try {
    const response = await axios.put(`${REST_API_BASE_URL}/${id}`, department);
    return response.data;
  } catch (error) {
    console.error(`Error updating department with id ${id}:`, error);
    throw error;
  }
};

// Function to delete a department by ID
export const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`${REST_API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting department with id ${id}:`, error);
    throw error;
  }
};
