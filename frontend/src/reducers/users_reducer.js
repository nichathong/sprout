import { RECEIVE_USER_GARDENS } from "../actions/garden_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_USER_GARDENS:
            // fix this...
            return action.data;
    
        default:
            return state;
    }
}

export default usersReducer;