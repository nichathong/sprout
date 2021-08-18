import { RECEIVE_CURRENT_USER_GARDEN, RECEIVE_USER_GARDENS, REMOVE_GARDEN_PLANT, RECEIVE_GARDEN_PLANT } from "../actions/garden_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_CURRENT_USER_GARDEN:
            return { [action.data.data.id]: action.data.data };
            
        case RECEIVE_USER_GARDENS:
            // fix this
            return action.data;

        case RECEIVE_GARDEN_PLANT:
            return action.data;

        case REMOVE_GARDEN_PLANT:
            // fix this
            console.log(action.data)
            let targetUser;
            // Object.values(state).forEach(user => {
            //     if (action.data.)
            // })
            return action.data;
    
        default:
            return state;
    }
}

export default usersReducer;