import { RECEIVE_GARDEN_ERRORS, RECEIVE_GARDEN_PLANT } from "../actions/garden_actions";


const _nullErrors = [];


const GardensErrorReducer = (oldState=_nullErrors, action) => {
    Object.freeze(oldState);
    switch(action.type){
        case RECEIVE_GARDEN_ERRORS:
            return action.errors;
        case RECEIVE_GARDEN_PLANT:
            return _nullErrors;
        default:
            return oldState;
    }
}

export default GardensErrorReducer;

