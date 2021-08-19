import axios from 'axios';

export const fetchAllGardenPlants = () => axios.get("/api/gardens");

export const fetchCurrentUserGardenPlants = () => axios.get("/api/gardens/mine");

export const fetchAllUserGardens = () => axios.get("/api/users/publicGardens");

export const addGardenPlant = gardenPlantId => axios.post(`/api/gardens/new/${gardenPlantId}`);

export const deleteGardenPlant = gardenPlantId => axios.delete(`/api/gardens/${gardenPlantId}`);

export const updateGardenPlant = gardenPlant => axios.patch(`/api/gardens/${gardenPlant.id}`,gardenPlant);

export const fetchGardenPlant = gardenPlantId => axios.get(`/api/gardens/detail/${gardenPlantId}`);
