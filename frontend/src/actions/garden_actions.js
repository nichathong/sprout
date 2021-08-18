import * as GardenAPIUtil from "../util/garden_util";

export const RECEIVE_CURRENT_USER_GARDEN = "RECEIVE_CURRENT_USER_GARDEN";
export const RECEIVE_USER_GARDENS = "RECEIVE_USER_GARDENS";
export const RECEIVE_GARDEN_PLANT = "RECEIVE_GARDEN_PLANT";
export const REMOVE_GARDEN_PLANT = "REMOVE_GARDEN_PLANT";

const receiveCurrentUserGarden = data => ({
    type: RECEIVE_CURRENT_USER_GARDEN,
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

const removeGardenPlant = data => ({
    type: REMOVE_GARDEN_PLANT,
    data
});

export const fetchCurrentUserGarden = user => dispatch => GardenAPIUtil.fetchCurrentUserGarden(user)
    .then(data => dispatch(receiveCurrentUserGarden(data)));

export const fetchAllUserGardens = () => dispatch => GardenAPIUtil.fetchAllUserGardens()
    .then(data => dispatch(receiveUserGardens(data)));

export const addGardenPlant = gardenPlantId => dispatch => GardenAPIUtil.addGardenPlant(gardenPlantId)
    .then(data => dispatch(receiveGardenPlant(data)));

export const deleteGardenPlant = gardenPlantId => dispatch => GardenAPIUtil.deleteGardenPlant(gardenPlantId)
    .then(data => dispatch(removeGardenPlant(data)));