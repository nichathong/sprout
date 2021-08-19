import { combineReducers } from 'redux';
import plants from "./plants_reducer";
import users from "./users_reducer";
import gardenPlants from "./garden_plants_reducer";

const entitiesReducer = combineReducers({
    users,
    plants,
    gardenPlants
});

export default entitiesReducer;