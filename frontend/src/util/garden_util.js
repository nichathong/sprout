import axios from 'axios';

export const fetchCurrentUserGarden = user => axios.get("/api/users/current", user);

export const fetchAllUserGardens = () => axios.get("/api/users/publicGardens");

export const addGardenPlant = gardenPlantId => axios.post(`/api/gardens/${gardenPlantId}`);

export const deleteGardenPlant = gardenPlantId => axios.delete(`/api/gardens/${gardenPlantId}`);
