import { RECEIVE_GARDEN_PLANT, REMOVE_GARDEN_PLANT, RECEIVE_GARDEN_PLANTS, UPDATE_GARDEN_PLANT } from "../actions/garden_actions";

const gardenPlantsReducer = (state = {}, action) => {
    Object.freeze(state);

    let nextState;
    switch(action.type) {
        case RECEIVE_GARDEN_PLANTS:
            nextState = {};
            action.data.data.forEach(gardenPlant => nextState[gardenPlant._id] = gardenPlant);
            return nextState;
            
        case RECEIVE_GARDEN_PLANT:
            return Object.assign({}, state, { [action.data.data._id]: action.data.data });
        
        case UPDATE_GARDEN_PLANT:
            let plant = JSON.parse(action.data.config.data);
            return Object.assign({}, state, { [plant.id]: plant });

        case REMOVE_GARDEN_PLANT:
            nextState = Object.assign({}, state);
            delete nextState[action.data];
            console.log(action.data);
            return nextState;
        
        default:
            return state;
    }
}

export default gardenPlantsReducer;