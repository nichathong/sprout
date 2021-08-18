import { RECEIVE_PLANT, RECEIVE_ALL_PLANTS, REMOVE_PLANT } from "../actions/plant_actions";

const plantsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState;

    switch(action.type) {
        case RECEIVE_ALL_PLANTS:
            nextState = {};
            // converting from array to obj (basically jbuilder but here instead)
            action.plants.data.forEach(plant => nextState[plant._id] = plant);
            return nextState;
            
        case RECEIVE_PLANT:
            return Object.assign({}, state, { [action.plant.data._id]: action.plant.data })

        case REMOVE_PLANT:
            nextState = Object.assign({}, state);
            delete nextState[action.plantId.data];
            return nextState;

        default:
            return state;
    }
}

export default plantsReducer;