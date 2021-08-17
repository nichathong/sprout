import { RECEIVE_USER_LOGOUT } from '../actions/session_actions';
import { RECEIVE_USER_SIGN_IN } from '../actions/session_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
const initialState = {
  isAuthenticated: false,
  user: {}
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_USER_SIGN_IN:
      debugger
      return {
        ...state,
        isSignedIn: true,
        user: action.user
      }
      
    default:
      return state;
  }
}

export default sessionReducer;