import { combineReducers } from 'redux';
import plants from "./plants_reducer";

const entitiesReducer = combineReducers({
    plants
});

export default entitiesReducer;