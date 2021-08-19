import { RECEIVE_USER_GARDENS } from "../actions/garden_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_USER_GARDENS:
            let nextState = {};
            action.data.data.forEach(user => nextState[user._id] = user);
            return nextState;
    
        default:
            return state;
    }
}

export default usersReducer;