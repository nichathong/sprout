import { RECEIVE_PLANT_ERRORS, RECEIVE_PLANT, UPDATE_PLANT } from "../actions/plant_actions";

const _nullErrors = [];


const PlantsErrorReducer = (oldState=_nullErrors, action) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_PLANT_ERRORS:
            return action.errors;
        case RECEIVE_PLANT:
            return _nullErrors;
        case UPDATE_PLANT:
            return _nullErrors;
        default:
            return oldState;
    }
}

export default PlantsErrorReducer;

