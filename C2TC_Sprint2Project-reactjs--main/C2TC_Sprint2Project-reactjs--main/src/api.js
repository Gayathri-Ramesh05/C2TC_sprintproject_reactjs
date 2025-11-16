import axios from "axios";

const API_URL = "http://localhost:8081/college";

export const getAllColleges = () => axios.get(`${API_URL}/all`);
export const addCollege = (data) => axios.post(`${API_URL}/add`, data);
export const updateCollege = (data) => axios.put(`${API_URL}/update`, data);
export const deleteCollege = (id) => axios.delete(`${API_URL}/delete/${id}`);
