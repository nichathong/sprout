import * as PlantAPIUtil from "../util/plant_api_util";

export const RECEIVE_PLANT = "RECEIVE_PLANT";
export const RECEIVE_ALL_PLANTS = "RECEIVE_ALL_PLANTS";
export const REMOVE_PLANT = "REMOVE_PLANT";

const receivePlant = plant => ({
    type: RECEIVE_PLANT,
    plant
});

const receiveAllPlants = plants => ({
    type: RECEIVE_ALL_PLANTS,
    plants
});

const removePlant = plantId => ({
    type: REMOVE_PLANT,
    plantId
});

export const createPlant = plant => dispatch => PlantAPIUtil.createPlant(plant)
    .then(plant => dispatch(receivePlant(plant)));

export const updatePlant = plant => dispatch => PlantAPIUtil.updatePlant(plant)
    .then(plant => dispatch(receivePlant(plant)));

export const deletePlant = plantId => dispatch => PlantAPIUtil.deletePlant(plantId)
    .then(() => dispatch(removePlant(plantId)));

export const fetchAllPlants = () => dispatch => PlantAPIUtil.getPlants()
    .then(plants => dispatch(receiveAllPlants(plants)));
