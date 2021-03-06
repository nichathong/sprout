import * as GardenAPIUtil from "../util/garden_util";
import { UPDATE_PLANT } from "./plant_actions";

export const RECEIVE_ALL_GARDEN_PLANTS = "RECEIVE_ALL_GARDEN_PLANTS";
export const RECEIVE_USER_GARDENS = "RECEIVE_USER_GARDENS";
export const RECEIVE_GARDEN_PLANT = "RECEIVE_GARDEN_PLANT";
export const RECEIVE_GARDEN_PLANTS = "RECEIVE_GARDEN_PLANTS";
export const REMOVE_GARDEN_PLANT = "REMOVE_GARDEN_PLANT";
export const UPDATE_GARDEN_PLANT = "UPDATE_GARDEN_PLANT";
export const RECEIVE_GARDEN_ERRORS = "RECEIVE_GARDEN_ERRORS";
export const CLEAR_GARDEN_ERRORS = "CLEAR_GARDEN_ERRORS";

const receiveAllGardenPlants = data => ({
    type: RECEIVE_ALL_GARDEN_PLANTS,
    data
});

const receiveUserGardens = data => ({
    type: RECEIVE_USER_GARDENS,
    data
});

const receiveGardenPlant = data => ({
    type: RECEIVE_GARDEN_PLANT,
    data
});

const receiveGardenPlants = data => ({
    type: RECEIVE_GARDEN_PLANTS,
    data
});

const removeGardenPlant = data => ({
    type: REMOVE_GARDEN_PLANT,
    data
});

const updateGardenPlantAction = data => ({
    type: UPDATE_GARDEN_PLANT,
    data
});

const receiveGardenErrors = errors => ({
    type: RECEIVE_GARDEN_ERRORS,
    errors
});

export const clearGardenErrors = () => ({
    type: CLEAR_GARDEN_ERRORS
});

export const fetchAllGardenPlants = () => dispatch => GardenAPIUtil.fetchAllGardenPlants()
    .then(data => dispatch(receiveAllGardenPlants(data)));

export const fetchCurrentUserGardenPlants = () => dispatch => GardenAPIUtil.fetchCurrentUserGardenPlants()
    .then(data => dispatch(receiveGardenPlants(data)));

export const fetchAllUserGardens = () => dispatch => GardenAPIUtil.fetchAllUserGardens()
    .then(data => dispatch(receiveUserGardens(data)));

export const addGardenPlant = gardenPlantId => dispatch => GardenAPIUtil.addGardenPlant(gardenPlantId)
    .then(data => dispatch(receiveGardenPlant(data)))
    .catch(err => dispatch(receiveGardenErrors(err.response.data)));


export const deleteGardenPlant = gardenPlantId => dispatch => GardenAPIUtil.deleteGardenPlant(gardenPlantId)
    .then(data => dispatch(removeGardenPlant(gardenPlantId)));

export const updateGardenPlant = gardenPlant => dispatch => GardenAPIUtil.updateGardenPlant(gardenPlant)
      .then(data => dispatch(updateGardenPlantAction(data)))

export const fetchGardenPlant = gardenPlantId => dispatch => GardenAPIUtil.fetchGardenPlant(gardenPlantId)
    .then(data => dispatch(receiveGardenPlant(data)))

