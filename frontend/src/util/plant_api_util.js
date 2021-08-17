import axios from 'axios';

export const getPlants = () => axios.get("/api/plants");

export const createPlant = plant => axios.post("/api/plants/new", plant);

export const updatePlant = plant => axios.patch(`/api/plants/${plant.id}`, plant);

export const deletePlant = plantId => axios.delete(`/api/plants/${plantId}`);
