import { combineReducers } from 'redux';
import plants from "./plants_reducer";
import users from "./users_reducer";

const entitiesReducer = combineReducers({
    users,
    plants
});

export default entitiesReducer;