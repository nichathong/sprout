import * as PlantAPIUtil from "../util/plant_api_util";

export const RECEIVE_PLANT = "RECEIVE_PLANT";
export const RECEIVE_ALL_PLANTS = "RECEIVE_ALL_PLANTS";
export const REMOVE_PLANT = "REMOVE_PLANT";
export const UPDATE_PLANT = "UPDATE_PLANT";
export const RECEIVE_PLANT_ERRORS = "RECEIVE_PLANT_ERRORS"

const receivePlant = plant => ({
    type: RECEIVE_PLANT,
    plant
});


const updatePlantAction = plant => ({
    type: UPDATE_PLANT,
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

const receivePlantErrors = errors => ({
    type: RECEIVE_PLANT_ERRORS,
    errors
})


export const createPlant = plant => dispatch => PlantAPIUtil.createPlant(plant)
    .then(plant => dispatch(receivePlant(plant)))
    .catch(err => { 
        if(err.response!==undefined){
            return dispatch(receivePlantErrors(err.response.data))}});

export const updatePlant = plant => dispatch => PlantAPIUtil.updatePlant(plant)
    .then(plant => dispatch(updatePlantAction(plant)))
    .catch(err => dispatch(receivePlantErrors(err.response.data)));

export const deletePlant = plantId => dispatch => PlantAPIUtil.deletePlant(plantId)
    .then(() => dispatch(removePlant(plantId)))
    .catch(err => dispatch(receivePlantErrors(err.response.data)));

export const fetchAllPlants = () => dispatch => PlantAPIUtil.getPlants()
    .then(plants => dispatch(receiveAllPlants(plants)));
