import { RECEIVE_GARDEN_PLANT, REMOVE_GARDEN_PLANT, RECEIVE_GARDEN_PLANTS, RECEIVE_ALL_GARDEN_PLANTS } from "../actions/garden_actions";

const gardenPlantsReducer = (state = {}, action) => {
    Object.freeze(state);

    let nextState;
    switch(action.type) {
        case RECEIVE_ALL_GARDEN_PLANTS:
            nextState = {};
            action.data.data.forEach(gardenPlant => nextState[gardenPlant._id] = gardenPlant);
            return nextState;

        case RECEIVE_GARDEN_PLANTS:
            nextState = {};
            action.data.data.forEach(gardenPlant => nextState[gardenPlant._id] = gardenPlant);
            return nextState;
            
        case RECEIVE_GARDEN_PLANT:
            return Object.assign({}, state, { [action.data.data._id]: action.data.data });

        case REMOVE_GARDEN_PLANT:
            nextState = Object.assign({}, state);
            delete nextState[action.data.data];
            return nextState;
        
        default:
            return state;
    }
}

export default gardenPlantsReducer;