import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import PlantsErrorReducer from './plants_error_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  plants: PlantsErrorReducer
});