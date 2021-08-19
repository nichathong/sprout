import axios from 'axios';

export const fetchCurrentUserGardenPlants = () => axios.get("/api/gardens/mine");

export const fetchAllUserGardens = () => axios.get("/api/users/publicGardens");

export const addGardenPlant = gardenPlantId => axios.post(`/api/gardens/new/${gardenPlantId}`);

export const deleteGardenPlant = gardenPlantId => axios.delete(`/api/gardens/${gardenPlantId}`);

export const updateGardenPlant = gardenPlantId => axios.patch(`/api/gardens/${gardenPlantId}`);

export const fetchGardenPlant = gardenPlantId => axios.get(`/api/gardens/detail/${gardenPlantId}`);
